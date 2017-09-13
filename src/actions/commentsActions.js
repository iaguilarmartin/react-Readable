export const ORDER_COMMENTS = 'ORDER_COMMENTS';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const CREATE_COMMENT = 'CREATE_COMMENT';

export function orderComments(criteria) {
    return {
        type: ORDER_COMMENTS,
        criteria
    }
}

export function voteComment(commentId, positive = false) {
    return {
        type: VOTE_COMMENT,
        commentId,
        positive
    }
}

export function deleteComment(commentId) {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export function createComment(data = {}) {
    return {
        type: CREATE_COMMENT,
        data
    }
}

export function updateComment(commentId, data = {}) {
    return {
        type: UPDATE_COMMENT,
        commentId,
        data
    }
}