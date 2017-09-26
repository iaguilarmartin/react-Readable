const initialState = {
    posts: {
		sortBy: "score",
		loading: false,
		error: null,
        items: []
    },
    currentPost: {
        loading: false,
        error: null,
        post: null,
        voting: false,
        saving: false,
        deleting: false,
        comments: {
            sortBy: "score",
            items: []
        }
    },
    categories: {
		loading: false,
		error: null,
		items: []
	}
};

export default initialState;