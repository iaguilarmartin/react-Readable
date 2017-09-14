const initialState = {
    posts: {
		sortBy: "score",
		loading: false,
		error: null,
        items: []
    },
    comments: {
		sortBy: "score",
		loading: false,
		error: null,
        items: []
    },
    categories: {
		loading: false,
		error: null,
		items: []
	}
};

export default initialState;