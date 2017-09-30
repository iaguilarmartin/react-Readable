import api from '../utils/api';
import { POSTS_VOTE_ONE, FETCH_POSTS, ORDER_POSTS } from './types';

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
        type: POSTS_VOTE_ONE,
        pending: true,
        postId
    };
}

function votePostsResult(postId, error, score) {
    return {
        type: POSTS_VOTE_ONE,
        pending: false,
        error,
        score,
        postId
    };
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