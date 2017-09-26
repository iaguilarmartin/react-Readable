import api from '../utils/api';

export const ORDER_POSTS = 'ORDER_POSTS';
export const FETCH_POSTS = 'FETCH_POSTS';

export function orderPosts(criteria) {
    return {
        type: ORDER_POSTS,
        criteria
    }
}

export function fetchPosts(category) {
	return dispatch => {
		dispatch(fetchPostsRequest());

		const promise = category ? api.posts.getByCategory(category) : api.posts.getAll();

		return promise
			.then(posts => dispatch(fetchPostsResult(null, posts)))
			.catch(err => dispatch(fetchPostsResult(err)));
	}
}

function fetchPostsRequest() {
	return {
		type: FETCH_POSTS,
		pending: true
	};
}

function fetchPostsResult(error, posts = null) {
	return {
		type: FETCH_POSTS,
		pending: false,
		error,
		posts
	};
}