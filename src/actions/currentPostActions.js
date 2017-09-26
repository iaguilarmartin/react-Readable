import api from '../utils/api';

export const FETCH_POST = 'FETCH_POST';
export const CLEAR_POST = 'CLEAR_POST';
export const ORDER_POST_COMMENTS = 'ORDER_POST_COMMENTS';
export const VOTE_POST = 'VOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const CREATE_POST = 'CREATE_POST';

export function fetchPost(id) {
    return dispatch => {
        dispatch(performPostRequest(FETCH_POST));

        return Promise.all([api.posts.getOne(id), api.comments.get(id)])
            .then(results => dispatch(fetchPostResponse(null, results[0], results[1])))
            .catch(error => dispatch(fetchPostResponse(error)));
    }
}

export function orderPostComments(criteria) {
    return {
        type: ORDER_POST_COMMENTS,
        criteria
    }
}

export function clearCurrentPost() {
    return {
        type: CLEAR_POST
    }
}

export function votePost(postId, positive = false) {
    return dispatch => {
        dispatch(performPostRequest(VOTE_POST));

        return api.posts.vote(postId, positive)
            .then(post => dispatch(postUpdateResponse(VOTE_POST, null, post)))
            .catch(err => dispatch(postUpdateResponse(VOTE_POST, err)));
    }
}

export function deletePost(postId) {
    return dispatch => {
        dispatch(performPostRequest(DELETE_POST));

        return api.posts.delete(postId)
            .then(post => dispatch(clearCurrentPost()))
            .catch(err => dispatch(postUpdateResponse(DELETE_POST, err)));
    }
}

export function createPost(title, body, author, category) {
    return dispatch => {
        dispatch(performPostRequest(CREATE_POST));

        return api.posts.create(title, body, author, category)
            .then(post => dispatch(postUpdateResponse(CREATE_POST, null, post)))
            .catch(err => dispatch(postUpdateResponse(CREATE_POST, err)));
    }
}

export function updatePost(postId, title, body) {
    return dispatch => {
        dispatch(performPostRequest(UPDATE_POST));

        return api.posts.update(postId, title, body)
            .then(post => dispatch(postUpdateResponse(UPDATE_POST, null, post)))
            .catch(err => dispatch(postUpdateResponse(UPDATE_POST, err)));
    }
}

function performPostRequest(type) {
    return {
        type,
        pending: true
    };
}

function fetchPostResponse(error, post = null, comments = null) {
    return {
        type: FETCH_POST,
        pending: false,
        error,
        post,
        comments
    };
}

function postUpdateResponse(type, error, post = null) {
    return {
        type,
        pending: false,
        error,
        post
    };
}