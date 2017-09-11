import React, { Component } from 'react';

class EditPost extends Component {

    state = {
        post: {},
        categories: [
            {
                name: 'react',
                path: 'react'
            },
            {
                name: 'redux',
                path: 'redux'
            },
            {
                name: 'udacity',
                path: 'udacity'
            }
        ]
    };

    deletePost(e, postId) {
        e.preventDefault();

        console.log("Delete post", postId);
    }

    savePost(e, postId) {
        e.preventDefault();

        console.log("Save post", postId);
    }

    render() {
        let { post, categories } = this.state;
        const postId = this.props.location.pathname.slice(11);

        if (postId) {
            post = {
                id: '8xf0y6ziyjabvozdd253nd',
                timestamp: 1467166872634,
                title: 'Udacity is the best place to learn React',
                body: 'Everyone says so after all.',
                author: 'thingtwo',
                category: 'react',
                voteScore: 6,
                deleted: false
            };
        }

        return (
            <div className="row">
                <div className="col s12">
                    <h4>{ post.id ? "Edit Post" : "New Post" }</h4>
                    <div className="card-panel">
                        <div className="row">
                            <form className="col s12" onSubmit={e => this.savePost(e, post.id)}>
                                <div className="input-field col s6">
                                    <input id="authorInput" type="text" name="author" defaultValue={post.author} className="validate" placeholder="e.g. trinity"/>
                                    <label className="active" htmlFor="authorInput">Author</label>
                                </div>
                                <div className="col s6">
                                    <label className="active" htmlFor="categorySelect">Category</label>
                                    <select id="categorySelect" className="browser-default" name="category">
                                        {categories.map(category => (<option key={category.path} value={category.path}>{category.name}</option>))}
                                    </select>
                                </div>
                                <div className="input-field col s12">
                                    <input id="titleInput" type="text" name="title" defaultValue={post.title} className="validate" placeholder="e.g. Learning React"/>
                                    <label className="active" htmlFor="titleInput">Title</label>
                                </div>
                                <div className="col s12">
                                    <label htmlFor="bodyInput">Body</label>
                                    <textarea id="bodyInput" name="body" className="grey lighten-4" defaultValue={post.body} rows="5"/>
                                </div>
                                <div className="col s6">
                                    <button type="submit" className="waves-effect waves-light btn red"><i className="material-icons right">send</i>Send</button>
                                </div>

                                {post.id && (
                                    <div className="col s6">
                                        <button onClick={e => this.deletePost(e, post.id)} className="waves-effect waves-red btn-flat right"><i className="material-icons left">delete</i>Delete</button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditPost;
