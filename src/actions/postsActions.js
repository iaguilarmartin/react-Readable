import api from '../utils/api';

export const ORDER_POSTS = 'ORDER_POSTS';
export const VOTE_POST = 'VOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';

export function orderPosts(criteria) {
    return {
        type: ORDER_POSTS,
        criteria
    }
}

export function votePost(postId, positive = false) {
    return {
        type: VOTE_POST,
        postId,
        positive
    }
}

export function deletePost(postId) {
    return {
        type: DELETE_POST,
        postId
    }
}

export function createPost(data = {}) {
    return {
        type: CREATE_POST,
        data
    }
}

export function updatePost(postId, data = {}) {
    return {
        type: UPDATE_POST,
        postId,
        data
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