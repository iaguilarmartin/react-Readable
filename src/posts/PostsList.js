import React, {Component} from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

import PostsListItem from './PostsListItem';
import FloatingButton from '../app/FloatingButton';
import SelectOrder from '../app/SelectOrder';
import * as actions from './postsActions';

class PostsList extends Component {
    componentDidMount() {
		if (!this.props.stillLoading) {
			this.props.fetchPosts(this.props.category.path);
		}
	}

    componentDidUpdate(prevProps) {
		if (!this.props.stillLoading && (!prevProps.category || this.props.category.path !== prevProps.category.path)) {
		    this.props.fetchPosts(this.props.category.path);
		}
	}

    createPost() {
        this.props.history.push("/new-post");
    }

    sortPosts(criteria) {
        this.props.orderPosts(criteria);
    }

    render() {
		if (this.props.stillLoading) {
			return (<div></div>);
		} else {
			return (
				<div>
					<div className="row">
						<h4 className="header">{this.props.category.name}</h4>
						<SelectOrder initialValue={this.props.order} onOrderChanged={c => this.sortPosts(c)}/>
					</div>

					<div className="row">
						{this.props.posts.map(post => (
							<PostsListItem key={post.id}
										id={post.id}
										title={post.title}
                                        category={post.category}
									   	author={post.author}
                                        voting={this.props.votingPosts.includes(post.id)}
										timestamp={post.timestamp}
                                        comments={post.comments}
                                        onVote={(postId, positive) => this.props.votePost(postId, positive)}
										score={post.voteScore}
							/>
						))}

						<FloatingButton icon="add" fixed={true} btnClick={() => this.createPost()}/>
					</div>
				</div>
			);
		}
    }
}

function mapStateToProps({posts, categories}, ownProps) {
	if (categories.loading || categories.items.length === 0) {
		return { stillLoading: true };
	}

	const order = posts.sortBy;
	const votingPosts = posts.voting;
	const query = queryString.parse(ownProps.location.search);
	const category = (query.category && categories.items.find(category => category.path === query.category))
		|| {name: 'All posts', path: null };

    const postsList = posts.items.filter(post => !post.deleted);
    postsList.sort((a, b) =>
        order === 'score' ? b.voteScore - a.voteScore : b.timestamp - a.timestamp
    );

    return {
        posts: postsList,
        order,
		category,
        votingPosts
    };
}

export default connect(mapStateToProps, actions)(PostsList);