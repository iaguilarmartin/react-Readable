import initialState from './initialState';

import { ORDER_POSTS } from '../actions/postsActions';

const postsReducer = function (state = initialState.posts, action) {
    switch (action.type) {
        case ORDER_POSTS:
            return {
                ...state,
                sortBy: action.criteria
            };
        default:
            return state;
    }
};

export default postsReducer;