import Uuid from 'uuid-lib';
import moment from 'moment';

import initialState from './initialState';

import {
    ORDER_COMMENTS,
    VOTE_COMMENT,
    DELETE_COMMENT,
    CREATE_COMMENT,
    UPDATE_COMMENT
} from '../actions/commentsActions';

const commentsReducer = function (state = initialState.comments, action) {
    const {type, commentId, positive} = action;

    switch (type) {
        case ORDER_COMMENTS:
            return {
                ...state,
                sortBy: action.criteria
            };
        case VOTE_COMMENT:
            return {
                ...state,
                items: {
                    ...state.items,
                    [commentId]: {
                        ...state.items[commentId],
                        voteScore: state.items[commentId].voteScore + (positive ? 1 : -1)
                    }
                }
            };
        case DELETE_COMMENT:
            return {
                ...state,
                items: {
                    ...state.items,
                    [commentId]: {
                        ...state.items[commentId],
                        deleted: true
                    }
                }
            };
        case CREATE_COMMENT:
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
                        deleted: false,
                        parentDeleted: false
                    }
                }
            };
        case UPDATE_COMMENT:
            return {
                ...state,
                items: {
                    ...state.items,
                    [commentId]: {
                        ...state.items[commentId],
                        ...action.data
                    }
                }
            };
        default:
            return state;
    }
};

export default commentsReducer;
