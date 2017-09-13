export const ORDER_POSTS = 'ORDER_POSTS';
export const VOTE_POST = 'VOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const CREATE_POST = 'CREATE_POST';

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