import initialState from './initialState';
import {
    FETCH_POST,
    VOTE_POST,
    UPDATE_POST,
    CREATE_POST,
    ORDER_POST_COMMENTS,
    CLEAR_POST,
    DELETE_POST
} from '../actions/currentPostActions';

const currentPostReducer = function (state = initialState.currentPost, action) {
    const { type, pending } = action;

    switch (type) {
        case FETCH_POST: {
            const { error, post, comments } = action;

            return {
                ...state,
                loading: pending,
                error: pending ? null : error,
                post: pending ? null : (post || null),
                comments: {
                    ...state.comments,
                    items: pending ? [] : (comments || []),
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
        case VOTE_POST: {
            if (pending) {
                return {
                    ...state,
                    voting: true,
                    error: null
                };
            } else {
                const { error, post } = action;

                return {
                    ...state,
                    voting: false,
                    error,
                    post: error ? state.post : post
                };
            }
        }
        case DELETE_POST:
            return {
                ...state,
                deleting: true
            };
        case CREATE_POST:
        case UPDATE_POST:
            if (pending) {
                return {
                    ...state,
                    saving: true,
                    error: null
                };
            } else {
                const { error, post } = action;

                return {
                    ...state,
                    saving: false,
                    error,
                    post: error ? state.post : post
                };
            }
        default:
            return state;
    }
};

export default currentPostReducer;