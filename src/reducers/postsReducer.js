import initialState from './initialState';

import {
    ORDER_POSTS,
	FETCH_POSTS,
    POSTS_VOTE_ONE
} from '../actions/types';

const postsReducer = function (state = initialState.posts, action) {
    switch (action.type) {
        case ORDER_POSTS:
            return {
                ...state,
                sortBy: action.criteria
            };
		case FETCH_POSTS: {
			const { error, posts, pending } = action;

			return {
				...state,
				loading: pending,
				error: pending ? null : error,
				items: pending ? [] : (posts || [])
			}
		}
        case POSTS_VOTE_ONE: {
            const { error, score, postId, pending } = action;

            if (pending) {
                return {
                    ...state,
                    voting: [
                        ...state.voting,
                        postId
                    ],
                    error: null
                }
            } else {
                return {
                    ...state,
                    error,
                    voting: state.voting.filter(item => item !== postId),
                    items: state.items.map(item => !error && postId === item.id ? {...item, voteScore: score} : item)
                }
            }
        }
        default:
            return state;
    }
};

export default postsReducer;