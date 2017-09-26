import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import avatarImg from '../images/avatar.png';
import CommentsList from './CommentsList';
import Score from './Score';
import FloatingButton from './FloatingButton';
import { fetchPost, orderPostComments, votePost, clearCurrentPost } from '../actions/currentPostActions';

class Post extends Component {
    componentWillMount() {
        this.props.fetchPost(this.props.postId);
    }

    componentWillUnmount() {
        this.props.clearCurrentPost();
    }

    vote(positive) {
        this.props.votePost(this.props.postId, positive);
    }

    edit() {
        this.props.history.push('/edit-post/' + this.props.postId);
    }

    render() {
        const { post, loading, comments, orderComments, voting } = this.props;

        if (loading) {
            return (<h5>Loading post data...</h5>);
        }
        else if (!post || post.deleted) {
            return (<h5>Ups! This post is no longer available</h5>);
        }

        const dateString = moment(post.timestamp).format('LL');

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
                        </div>
                    </div>

                    <CommentsList postId={post.id}
                                  comments={comments.items}
                                  onVoted={() => {}}
                                  onDeleted={() => {}}
                                  onOrderChanged={c => orderComments(c)}
                                  order={comments.sortBy}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps({currentPost}, ownProps) {
    const postId = ownProps.location.pathname.slice(6);
    const {post, loading, comments, voting} = currentPost;

    return {
        postId,
        post,
        loading,
        voting,
        comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPost: id => dispatch(fetchPost(id)),
        orderComments: c => dispatch(orderPostComments(c)),
        votePost: (id, positive) => dispatch(votePost(id, positive)),
        clearCurrentPost: () => dispatch(clearCurrentPost())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);