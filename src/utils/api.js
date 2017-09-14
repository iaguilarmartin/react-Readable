const baseUrl = "http://localhost:7001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) {
    token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

const API = {
	categories: {
	  	getAll () {
			return fetch(`${baseUrl}/categories`, { headers })
				.then(res => res.json())
				.then(data => data.categories);
		}
	},

	posts: {
		getAll () {
			return fetch(`${baseUrl}/posts`, { headers })
				.then(res => res.json());
		},

		getByCategory (category) {
			return fetch(`${baseUrl}/${category}/posts`, { headers })
				.then(res => res.json());
		}
	}
};

export default API;