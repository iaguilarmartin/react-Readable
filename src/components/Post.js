import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import avatarImg from '../images/avatar.png';
import CommentsList from './CommentsList';
import Score from './Score';
import FloatingButton from './FloatingButton';
import { isEmptyObject } from '../utils/utils';
import {
	fetchPost,
	orderPostComments,
	votePost,
	deletePost,
	clearCurrentPost,
	addComment,
	updateComment,
	deleteComment,
	voteComment
} from '../actions/currentPostActions';

class Post extends Component {
    componentWillMount() {
        this.props.fetchPost(this.props.postId);
    }

    componentWillUnmount() {
        this.props.clearCurrentPost();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.deleting && !this.props.deleting && (!this.props.post || isEmptyObject(this.props.post))) {
            this.props.history.push('/');
        }
    }

    vote(positive) {
        this.props.votePost(this.props.postId, positive);
    }

    edit() {
        this.props.history.push('/edit-post/' + this.props.postId);
	}

	delete() {
        this.props.deletePost(this.props.postId);
    }

    render() {
        const { post, loading, comments, orderComments, voting, addComment, updateComment, deleteComment, voteComment } = this.props;

        if (loading) {
            return (<h5>Loading post data...</h5>);
        } else if (!post || isEmptyObject(post) || post.deleted) {
            return (<h5>Ups! This post is no longer available</h5>);
        }

        const dateString = moment(post.timestamp).format('LL');
		const commentsArray = Object.keys(comments.items).map(commentId => comments.items[commentId]);

        return (
            <div className="row">
                <div className="col s12">
                    <div className="section">
                        <h5 className="header grey-text text-darken-2">{post.category}</h5>
                        <h4 className="header post-title">{post.title}</h4>
                        <div className="post z-depth-2 white">
                            <div>
                                <img className="author-avatar" src={avatarImg} alt="User avatar" />
                                <div className="author-info">
                                    <span className="post-author red-text text-lighten-1">{post.author}</span>
                                    <label>{dateString}</label>
                                </div>
                            </div>
                            <p>{post.body}</p>
                            <Score score={post.voteScore} disable={voting} onVote={p => this.vote(p)}/>
                            <div className="post-edit">
                                <FloatingButton icon="edit" btnClick={() => this.edit()}/>
                            </div>
							<div className="post-delete">
                                <FloatingButton backgroundColor="white" color="red" icon="delete" isSmall={true} btnClick={() => this.delete()}/>
                            </div>
                        </div>
                    </div>

                    <CommentsList comments={commentsArray}
							onCreated={(author, body) => addComment(body, author, post.id)}
							onSaved={(id, body) => updateComment(id, body)}
							onVoted={(id, positive) => voteComment(id, positive)}
							onDeleted={id => deleteComment(id)}
							onOrderChanged={c => orderComments(c)}
							order={comments.sortBy}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps({currentPost}, ownProps) {
    const postId = ownProps.location.pathname.slice(6);
    const {post, loading, comments, voting, deleting} = currentPost;

    return {
        postId,
        post,
        loading,
        voting,
		comments,
		deleting
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPost: id => dispatch(fetchPost(id)),
		orderComments: c => dispatch(orderPostComments(c)),
		deletePost: (id) => dispatch(deletePost(id)),
        votePost: (id, positive) => dispatch(votePost(id, positive)),
		clearCurrentPost: () => dispatch(clearCurrentPost()),
		addComment: (body, author, postId) => dispatch(addComment(body, author, postId)),
		updateComment: (id, body) => dispatch(updateComment(id, body)),
		deleteComment: id => dispatch(deleteComment(id)),
		voteComment: (id, positive) => dispatch(voteComment(id, positive))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);