import initialState from '../store/initialState';
import * as types from './currentPostActionTypes';

const currentPostReducer = function (state = initialState.currentPost, action) {
    const { type, pending } = action;

    switch (type) {
        case types.FETCH_POST: {
            const { error, post, comments } = action;
			const mappedComments = comments && comments.reduce((value, comment) => {
				value[comment.id] = comment;
				return value;
			}, {});

            return {
                ...state,
                loading: pending,
                error: pending ? null : error,
                post: pending ? null : (post || null),
                comments: {
                    ...state.comments,
                    items: pending ? {} : (mappedComments || {}),
                }
            }
        }
        case types.CLEAR_POST: {
            return {
                ...initialState.currentPost
            }
        }
        case types.ORDER_POST_COMMENTS: {
            return {
                ...state,
                comments: {
                    ...state.comments,
                    sortBy: action.criteria
                }
            }
        }
        case types.DELETE_POST: {
            return {
                ...state,
                deleting: true
			};
		}
        case types.CREATE_POST:
        case types.UPDATE_POST: {
            return postModifiedState(state, action, 'saving');
		}
		case types.VOTE_POST: {
			return postModifiedState(state, action, 'voting');
        }
		case types.UPDATE_COMMENT:
		case types.ADD_COMMENT: {
			return postCommentsModifiedState(state, action, 'saving');
		}
		case types.VOTE_COMMENT: {
			return postCommentsModifiedState(state, action, 'voting');
		}
		case types.DELETE_COMMENT: {
			return postCommentsModifiedState(state, action, 'deleting');
		}
        default:
            return state;
    }
};

function postModifiedState(state, action, pendingAtt) {
	const { pending, error, post } = action;

	if (pending) {
		return {
			...state,
			[pendingAtt]: true,
			error: null
		};
	} else {
		return {
			...state,
			[pendingAtt]: false,
			error,
			post: error ? state.post : post
		};
	}
}

function postCommentsModifiedState(state, action, pendingAtt) {
	const { pending, error, comment } = action;

	if (pending) {
		return {
			...state,
			comments: {
				...state.comments,
				[pendingAtt]: true,
				error: null
			}
		};
	} else {
		if (error) {
			return {
				...state,
				comments: {
					...state.comments,
					[pendingAtt]: false,
					error
				}
			};
		} else {
			return {
				...state,
				comments: {
					...state.comments,
					[pendingAtt]: false,
					error: null,
					items: {
						...state.comments.items,
						[comment.id || comment]: typeof comment === 'string' ? null : comment
					}
				}
			};
		}
	}
}

export default currentPostReducer;