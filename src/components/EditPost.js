import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost, updatePost, createPost } from '../actions/postsActions';

class EditPost extends Component {

    deletePost(e, postId) {
        e.preventDefault();

        this.props.deletePost(postId);

        this.props.history.goBack();
        this.props.history.goBack();
    }

    savePost(e, postId) {
        e.preventDefault();

        const data = {
            body: e.target.body.value,
            author: e.target.author.value,
            category: e.target.category.value,
            title: e.target.title.value
        };

        if (postId) {
            this.props.updatePost(postId, data);
        } else {
            this.props.createPost(data);
        }

        this.props.history.goBack();
    }

    render() {
        const { post, categories } = this.props;

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

function mapStateToProps({ posts, categories }, ownProps) {
    const postId = ownProps.location.pathname.slice(11);

    return {
        categories: categories.items,
        post: postId ? posts.items[postId] : {}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: data => dispatch(createPost(data)),
        updatePost: (postId, data) => dispatch(updatePost(postId, data)),
        deletePost: postId => dispatch(deletePost(postId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
