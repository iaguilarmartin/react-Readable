import api from '../utils/api';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

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
		type: FETCH_CATEGORIES,
		pending: true
	};
}

function fetchCategoriesResult(error, categories = null) {
	return {
		type: FETCH_CATEGORIES,
		pending: false,
		error,
		categories
	};
}