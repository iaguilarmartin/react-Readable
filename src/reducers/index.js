import { combineReducers } from 'redux';

import posts from './postsReducer';
import categories from './categoriesReducer';
import currentPost from './currentPostReducer';

const rootReducer = combineReducers({
    posts,
    categories,
    currentPost
});

export default rootReducer;
