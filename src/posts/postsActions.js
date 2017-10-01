import api from '../utils/api';
import * as types from './postsActionTypes';

export function orderPosts(criteria) {
    return {
        type: types.ORDER_POSTS,
        criteria
    }
}

export function fetchPosts(category) {
	return dispatch => {
		dispatch(fetchPostsRequest());

		const promise = category ? api.posts.getByCategory(category) : api.posts.getAll();

		return promise
			.then(posts => {
				const promises = posts.map(post => api.comments.get(post.id));
				Promise.all(promises)
					.then(results => {
						results.forEach((comments, index) => posts[index].comments = comments.length);
                        dispatch(fetchPostsResult(null, posts));
                    })
            })
			.catch(err => dispatch(fetchPostsResult(err)));
	}
}

export function votePost(postId, positive) {
    return dispatch => {
        dispatch(votePostsRequest(postId));

        return api.posts.vote(postId, positive)
            .then(post => dispatch(votePostsResult(postId, null, post.voteScore)))
            .catch(err => dispatch(votePostsResult(postId, err)));
    }
}

function votePostsRequest(postId) {
    return {
        type: types.POSTS_VOTE_ONE,
        pending: true,
        postId
    };
}

function votePostsResult(postId, error, score) {
    return {
        type: types.POSTS_VOTE_ONE,
        pending: false,
        error,
        score,
        postId
    };
}

function fetchPostsRequest() {
	return {
		type: types.FETCH_POSTS,
		pending: true
	};
}

function fetchPostsResult(error, posts = null) {
	return {
		type: types.FETCH_POSTS,
		pending: false,
		error,
		posts
	};
}