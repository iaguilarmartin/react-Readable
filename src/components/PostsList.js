import React, {Component} from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

import PostsListItem from './PostsListItem';
import FloatingButton from './FloatingButton';
import SelectOrder from './SelectOrder';
import { orderPosts } from '../actions/postsActions';

class PostsList extends Component {
    createPost() {
        this.props.history.push("/edit-post");
    }

    sortPosts(criteria) {
        this.props.changeOrder(criteria);
    }

    render() {
        const header = this.props.category && this.props.category.name || "All posts";

        return (
            <div>
                <div className="row">
                    <h4 className="header">{header}</h4>
                    <SelectOrder initialValue={this.props.order} onOrderChanged={c => this.sortPosts(c)}/>
                </div>

                <div className="row">
                    {this.props.posts.map(post => (
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

function mapStateToProps({posts, categories}, ownProps) {
    const query = queryString.parse(ownProps.location.search);
    const category = query.category ? categories.find(category => category.path === query.category) : null;
    const order = posts.sortBy;

    let postsList = Object.keys(posts.items).map(postId => posts.items[postId]);
    if (category) {
        postsList = postsList.filter(post => post.category === category.path);
    }

    postsList.sort((a, b) =>
        order === 'score' ? b.voteScore - a.voteScore : b.timestamp - a.timestamp
    );

    return {
        posts: postsList,
        order,
        category
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeOrder: criteria => dispatch(orderPosts(criteria))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);