import { combineReducers } from 'redux';

import posts from '../posts/postsReducer';
import categories from '../categories/categoriesReducer';
import currentPost from '../currentPost/currentPostReducer';

const rootReducer = combineReducers({
    posts,
    categories,
    currentPost
});

export default rootReducer;
