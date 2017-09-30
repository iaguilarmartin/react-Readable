import api from '../utils/api';
import {
    FETCH_POST,
    ORDER_POST_COMMENTS,
    CLEAR_POST,
    VOTE_POST,
    DELETE_POST,
    CREATE_POST,
    UPDATE_POST,
    UPDATE_COMMENT,
    VOTE_COMMENT,
    ADD_COMMENT,
    DELETE_COMMENT
} from './types';

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

export function addComment(body, author, postId) {
    return dispatch => {
        dispatch(performPostRequest(ADD_COMMENT));

        return api.comments.create(body, author, postId)
            .then(comment => dispatch(commentUpdateResponse(ADD_COMMENT, null, comment)))
            .catch(err => dispatch(commentUpdateResponse(ADD_COMMENT, err)));
    }
}

export function updateComment(id, body) {
    return dispatch => {
        dispatch(performPostRequest(UPDATE_COMMENT));

        return api.comments.update(id, body)
            .then(comment => dispatch(commentUpdateResponse(UPDATE_COMMENT, null, comment)))
            .catch(err => dispatch(commentUpdateResponse(UPDATE_COMMENT, err)));
    }
}

export function deleteComment(id) {
    return dispatch => {
        dispatch(performPostRequest(DELETE_COMMENT));

        return api.comments.delete(id)
            .then(() => dispatch(commentUpdateResponse(DELETE_COMMENT, null, id)))
            .catch(err => dispatch(commentUpdateResponse(DELETE_COMMENT, err)));
    }
}

export function voteComment(id, positive = false) {
    return dispatch => {
        dispatch(performPostRequest(VOTE_COMMENT));

        return api.comments.vote(id, positive)
            .then(comment => dispatch(commentUpdateResponse(VOTE_COMMENT, null, comment)))
            .catch(err => dispatch(commentUpdateResponse(VOTE_COMMENT, err)));
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

function commentUpdateResponse(type, error, comment = null) {
    return {
        type,
        pending: false,
        error,
        comment
    };
}