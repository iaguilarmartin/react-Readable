import { combineReducers } from 'redux';

import comments from './commentsReducer';
import posts from './postsReducer';
import categories from './categoriesReducer';

const rootReducer = combineReducers({
    comments,
    posts,
    categories
});

export default rootReducer;
