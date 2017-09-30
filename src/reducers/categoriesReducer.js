import initialState from './initialState';
import { FETCH_CATEGORIES } from '../actions/types';

const categoriesReducer = function (state = initialState.categories, action) {
	const { type, error, categories, pending } = action;

	switch(type) {
		case FETCH_CATEGORIES: {
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

