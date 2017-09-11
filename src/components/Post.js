import React, { Component } from 'react';
import moment from 'moment';

import avatarImg from '../images/avatar.png';
import CommentsList from './CommentsList';
import Score from './Score';
import FloatingButton from './FloatingButton';

class Post extends Component {
    state = {
        post: {
            id: '8xf0y6ziyjabvozdd253nd',
            timestamp: 1467166872634,
            title: 'Udacity is the best place to learn React',
            body: 'Everyone says so after all.',
            author: 'thingtwo',
            category: 'react',
            voteScore: 6,
            deleted: false
        }
    };

    vote(positive) {
        console.log(positive);
    }

    edit() {
        this.props.history.push('/edit-post/' + this.state.post.id);
    }

    render() {
        const postId = this.props.location.pathname.slice(6);
        const { post } = this.state;
        const dateString = moment(post.timestamp).format('LL');

        return (
            <div className="row">
                <div className="col s12">
                    <div className="section">
                        <h5 className="header grey-text text-darken-2">{post.category}</h5>
                        <h4 className="header post-title">{post.title}</h4>
                        <div className="post z-depth-2 white">
                            <div>
                                <img className="author-avatar" src={avatarImg} />
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

export default Post;