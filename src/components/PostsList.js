import React, {Component} from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

import PostsListItem from './PostsListItem';
import FloatingButton from './FloatingButton';
import SelectOrder from './SelectOrder';
import { orderPosts, fetchPosts } from '../actions/postsActions';

class PostsList extends Component {
	componentWillMount() {
		if (!this.props.stillLoading) {
			this.props.fetchPosts(this.props.category.path);
		}
	}

	componentWillUpdate(nextProps) {
		if (!nextProps.stillLoading && (!this.props.category || nextProps.category.path !== this.props.category.path)) {
			nextProps.fetchPosts(nextProps.category.path);
		}
	}

    createPost() {
        this.props.history.push("/edit-post");
    }

    sortPosts(criteria) {
        this.props.changeOrder(criteria);
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
}

function mapStateToProps({posts, categories}, ownProps) {
	if (categories.loading || !categories.items) {
		return { stillLoading: true };
	}

	const order = posts.sortBy;
	const query = queryString.parse(ownProps.location.search);
	const category = (query.category && categories.items.find(category => category.path === query.category))
		|| {name: 'All posts', path: null };

    let postsList = posts.items.filter(post => !post.deleted);

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
		changeOrder: criteria => dispatch(orderPosts(criteria)),
		fetchPosts: category => dispatch(fetchPosts(category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);