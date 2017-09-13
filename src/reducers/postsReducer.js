import Uuid from 'uuid-lib';
import moment from 'moment';

import initialState from './initialState';

import {
    ORDER_POSTS,
    VOTE_POST,
    DELETE_POST,
    UPDATE_POST,
    CREATE_POST
} from '../actions/postsActions';

const postsReducer = function (state = initialState.posts, action) {
    const {type, postId, positive} = action;

    switch (type) {
        case ORDER_POSTS:
            return {
                ...state,
                sortBy: action.criteria
            };
        case VOTE_POST:
            return {
                ...state,
                items: {
                    ...state.items,
                    [postId]: {
                        ...state.items[postId],
                        voteScore: state.items[postId].voteScore + (positive ? 1 : -1)
                    }
                }
            };
        case DELETE_POST:
            return {
                ...state,
                items: {
                    ...state.items,
                    [postId]: {
                        ...state.items[postId],
                        deleted: true
                    }
                }
            };
        case CREATE_POST:
            const uuid = Uuid.raw();

            return {
                ...state,
                items: {
                    ...state.items,
                    [uuid]: {
                        ...action.data,
                        id: uuid,
                        timestamp: moment.utc().valueOf(),
                        voteScore: 0,
                        deleted: false
                    }
                }
            };
        case UPDATE_POST:
            return {
                ...state,
                items: {
                    ...state.items,
                    [postId]: {
                        ...state.items[postId],
                        ...action.data
                    }
                }
            };
        default:
            return state;
    }
};

export default postsReducer;