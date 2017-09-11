import React, {Component} from 'react';
import queryString from 'query-string';

import PostsListItem from './PostsListItem';
import FloatingButton from './FloatingButton';
import SelectOrder from './SelectOrder';

class PostsList extends Component {
    state = {
        posts: [
            {
                id: '8xf0y6ziyjabvozdd253nd',
                timestamp: 1467166872634,
                title: 'Udacity is the best place to learn React',
                body: 'Everyone says so after all.',
                author: 'thingtwo',
                category: 'react',
                voteScore: 6,
                deleted: false
            },
            {
                id: '6ni6ok3ym7mf1p33lnez',
                timestamp: 1468479767190,
                title: 'Learn Redux in 10 minutes!',
                body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                author: 'thingone',
                category: 'redux',
                voteScore: -5,
                deleted: false
            }
        ]
    };

    createPost() {
        this.props.history.push("/edit-post");
    }

    sortPosts(criteria) {
        console.log(criteria);
    }

    render() {
        const query = queryString.parse(this.props.location.search);
        const header = query.category || "All posts";

        return (
            <div>
                <div className="row">
                    <h4 className="header">{header}</h4>
                    <SelectOrder onOrderChanged={c => this.sortPosts(c)}/>
                </div>

                <div className="row">
                    {this.state.posts.map(post => (
                        <PostsListItem key={post.id}
                                       id={post.id}
                                       title={post.title}
                                       timestamp={post.timestamp}
                                       score={post.voteScore}
                        />
                    ))}

                    <FloatingButton icon="add" fixed={true} btnClick={() => this.createPost()}/>
                </div>
            </div>
        );
    }
}

export default PostsList;