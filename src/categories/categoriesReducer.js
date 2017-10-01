import initialState from '../store/initialState';
import * as types from './categoriesActionTypes';

const categoriesReducer = function (state = initialState.categories, action) {
	const { type, error, categories, pending } = action;

	switch(type) {
		case types.FETCH_CATEGORIES: {
			return {
				loading: pending,
				error: pending ? null : error,
				items: pending ? [] : (categories || [])
			}
		}
		default:
			return state;
	}
};

export default categoriesReducer;

