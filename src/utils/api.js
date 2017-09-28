import Uuid from 'uuid-lib';
import moment from 'moment';

const baseUrl = "http://localhost:5001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) {
    token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token
};

const API = {
	categories: {
	  	getAll () {
			return fetch(`${baseUrl}/categories`, { headers })
				.then(requestHandler)
				.then(data => data.categories);
		}
	},

	posts: {
		getAll () {
			return fetch(`${baseUrl}/posts`, { headers })
				.then(requestHandler);
		},

		getByCategory (category) {
			return fetch(`${baseUrl}/${category}/posts`, { headers })
				.then(requestHandler);
		},

		getOne(id) {
			return fetch(`${baseUrl}/posts/${id}`, { headers })
				.then(requestHandler);
		},

		vote(id, positive) {
		    const data = {
                option: positive ? 'upVote' : 'downVote'
            };

            return fetch(`${baseUrl}/posts/${id}`, { method: 'POST', headers, body: JSON.stringify(data) })
				.then(requestHandler);
        },

        update(id, title, body) {
            const data = {
                title,
                body
            };

            return fetch(`${baseUrl}/posts/${id}`, { method: 'PUT', headers, body: JSON.stringify(data) })
				.then(requestHandler);
        },

        create(title, body, author, category) {
            const data = {
                title,
                body,
                author,
                category,
                id: Uuid.raw(),
                timestamp: moment.utc().valueOf(),
            };

            return fetch(`${baseUrl}/posts`, { method: 'POST', headers, body: JSON.stringify(data) })
				.then(requestHandler);
        },

        delete(id) {
            return fetch(`${baseUrl}/posts/${id}`, { method: 'DELETE', headers });
        }
	},

	comments: {
	    get (postId) {
            return fetch(`${baseUrl}/posts/${postId}/comments`, { headers })
				.then(requestHandler);
        },

		vote(id, positive) {
		    const data = {
                option: positive ? 'upVote' : 'downVote'
            };

            return fetch(`${baseUrl}/comments/${id}`, { method: 'POST', headers, body: JSON.stringify(data) })
				.then(requestHandler);
		},

		update(id, body) {
            const data = {
                timestamp: moment.utc().valueOf(),
                body
            };

            return fetch(`${baseUrl}/comments/${id}`, { method: 'PUT', headers, body: JSON.stringify(data) })
				.then(requestHandler);
		},

		create(body, author, postId) {
            const data = {
                body,
                author,
                parentId: postId,
                id: Uuid.raw(),
                timestamp: moment.utc().valueOf(),
            };

            return fetch(`${baseUrl}/comments`, { method: 'POST', headers, body: JSON.stringify(data) })
				.then(requestHandler);
        },

		delete(id) {
			return fetch(`${baseUrl}/comments/${id}`, { method: 'DELETE', headers });
		}
    }
};

function requestHandler(res) {
	if (res.status !== 200) {
		throw res.statusText;
	} else {
		return res.json()
	}
}

export default API;