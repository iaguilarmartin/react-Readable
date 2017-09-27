import initialState from './initialState';
import {
    FETCH_POST,
    VOTE_POST,
    UPDATE_POST,
    CREATE_POST,
    ORDER_POST_COMMENTS,
    CLEAR_POST,
	DELETE_POST,
	ADD_COMMENT,
	UPDATE_COMMENT,
	DELETE_COMMENT,
	VOTE_COMMENT
} from '../actions/currentPostActions';

const currentPostReducer = function (state = initialState.currentPost, action) {
    const { type, pending } = action;

    switch (type) {
        case FETCH_POST: {
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
        case CLEAR_POST: {
            return {
                ...initialState.currentPost
            }
        }
        case ORDER_POST_COMMENTS: {
            return {
                ...state,
                comments: {
                    ...state.comments,
                    sortBy: action.criteria
                }
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                deleting: true
			};
		}
        case CREATE_POST:
        case UPDATE_POST: {
            return postModifiedState(state, action, 'saving');
		}
		case VOTE_POST: {
			return postModifiedState(state, action, 'voting');
        }
		case UPDATE_COMMENT:
		case ADD_COMMENT: {
			return postCommentsModifiedState(state, action, 'saving');
		}
		case VOTE_COMMENT: {
			return postCommentsModifiedState(state, action, 'voting');
		}
		case DELETE_COMMENT: {
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