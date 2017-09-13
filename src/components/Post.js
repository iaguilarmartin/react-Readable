import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import avatarImg from '../images/avatar.png';
import CommentsList from './CommentsList';
import Score from './Score';
import FloatingButton from './FloatingButton';
import { votePost } from '../actions/postsActions';

class Post extends Component {
    vote(positive) {
        this.props.addVote(this.props.post.id, positive);
    }

    edit() {
        this.props.history.push('/edit-post/' + this.props.post.id);
    }

    render() {
        const { post } = this.props;

        if (!post || post.deleted) {
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
                            <Score score={post.voteScore} onVote={p => this.vote(p)}/>
                            <div className="post-edit">
                                <FloatingButton icon="edit" btnClick={() => this.edit()}/>
                            </div>
                        </div>
                    </div>

                    <CommentsList postId={post.id}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps({posts}, ownProps) {
    const postId = ownProps.location.pathname.slice(6);
    const post = posts.items[postId] || null;

    return {
        post
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addVote: (postId, positive) => dispatch(votePost(postId, positive))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);