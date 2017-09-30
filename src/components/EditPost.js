import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost, updatePost, createPost, clearCurrentPost } from '../actions/currentPostActions';
import { isEmptyObject } from '../utils/utils';

class EditPost extends Component {

    componentDidMount() {
        const { postId, fetchPost } = this.props;

        postId && fetchPost(postId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.saving && !this.props.saving && this.props.post) {
            this.props.history.push('/post/' + this.props.post.id);
        } else if (prevProps.deleting && !this.props.deleting && !this.props.post) {
            this.props.history.push('/');
        }
    }

    componentWillUnmount() {
        this.props.clearCurrentPost();
    }

    deletePost(e, postId) {
        e.preventDefault();

        this.props.deletePost(postId);
    }

    savePost(e, postId) {
        e.preventDefault();

        if (postId) {
            this.props.updatePost(postId, e.target.title.value, e.target.body.value);
        } else {
            this.props.createPost(e.target.title.value ,e.target.body.value, e.target.author.value, e.target.category.value);
        }
    }

    render() {
        const { postId, loading, categories, saving, deleting } = this.props;
        const post = postId ? this.props.post : {};

        if (loading) {
            return (<h5>Loading post data...</h5>);
        }
        else if (postId && (!post || isEmptyObject(post) || post.deleted)) {
            return (<h5>Ups! This post is no longer available</h5>);
        }

        return (
            <div className="row">
                <div className="col s12">
                    <h4>{ postId ? "Edit Post" : "New Post" }</h4>
                    <div className="card-panel">
                        <div className="row">
                            <form className="col s12" onSubmit={e => this.savePost(e, post.id)}>
                                <div className="input-field col s6">
                                    <input id="authorInput" type="text" name="author" disabled={postId} defaultValue={post.author} className="validate" placeholder="e.g. trinity"/>
                                    <label className="active" htmlFor="authorInput">Author</label>
                                </div>
                                <div className="col s6">
                                    <label className="active" htmlFor="categorySelect">Category</label>
                                    <select id="categorySelect" className="browser-default" disabled={postId} name="category" defaultValue={post.category}>
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
                                    <button type="submit" disabled={saving || deleting} className="waves-effect waves-light btn red"><i className="material-icons right">send</i>Send</button>
                                </div>

                                {postId && (
                                    <div className="col s6">
                                        <button onClick={e => this.deletePost(e, postId)} disabled={saving || deleting} className="waves-effect waves-red btn-flat right"><i className="material-icons left">delete</i>Delete</button>
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

function mapStateToProps({ currentPost, categories }, ownProps) {
    const postId = ownProps.location.pathname.slice(11);
    const { post, loading, saving, deleting } = currentPost;

    return {
        postId,
        loading,
        saving,
        deleting,
        categories: categories.items,
        post
    }
}

export default connect(mapStateToProps, { fetchPost, deletePost, updatePost, createPost, clearCurrentPost })(EditPost);
