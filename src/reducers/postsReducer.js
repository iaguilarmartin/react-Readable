import initialState from './initialState';

import {
    ORDER_POSTS,
	FETCH_POSTS
} from '../actions/postsActions';

const postsReducer = function (state = initialState.posts, action) {
    const {type, criteria} = action;

    switch (type) {
        case ORDER_POSTS:
            return {
                ...state,
                sortBy: criteria
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
        default:
            return state;
    }
};

export default postsReducer;