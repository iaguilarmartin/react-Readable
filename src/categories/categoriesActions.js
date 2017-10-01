import api from '../utils/api';
import * as types from './categoriesActionTypes';

export function fetchCategories() {
	return dispatch => {
		dispatch(fetchCategoriesRequest());
		return api.categories.getAll()
			.then(categories => dispatch(fetchCategoriesResult(null, categories)))
			.catch(err => dispatch(fetchCategoriesResult(err)));
	};
}

function fetchCategoriesRequest() {
	return {
		type: types.FETCH_CATEGORIES,
		pending: true
	};
}

function fetchCategoriesResult(error, categories = null) {
	return {
		type: types.FETCH_CATEGORIES,
		pending: false,
		error,
		categories
	};
}