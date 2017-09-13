import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createComment, updateComment } from '../actions/commentsActions';

class EditComment extends Component {
    createComment(e) {
        e.preventDefault();

        const data = {
            body: e.target.body.value,
            author: e.target.author.value,
            parentId: this.props.postId
        };

        if (this.props.commentId) {
            this.props.updateComment(this.props.commentId, data);
        } else {
            this.props.createComment(data);
        }

        e.target.reset();

        this.props.commentSaved && this.props.commentSaved();
    }

    render() {
        const { author, body } = this.props;

        return (
            <form onSubmit={e => this.createComment(e)}>
                <div className="input-field col s6">
                    <input id="authorInput" type="text" name="author" defaultValue={author} className="validate" placeholder="e.g. trinity"/>
                    <label className="active" htmlFor="authorInput">Author</label>
                </div>
                <div className="col s12">
                    <label htmlFor="bodyInput">Body</label>
                    <textarea id="bodyInput" name="body" className="grey lighten-4" defaultValue={body} rows="5"/>
                </div>
                <div className="col s12">
                    <button type="submit" className="waves-effect waves-light btn red"><i className="material-icons right">send</i>Send</button>
                </div>
            </form>
        );
    }
}

EditComment.propTypes = {
    commentId: PropTypes.string,
    postId: PropTypes.string.isRequired,
    commentSaved: PropTypes.func
};

function mapStateToProps({ comments }, ownProps) {
    const commentId = ownProps.commentId;
    if (!commentId) {
        return {};
    }

    const comment = comments.items[commentId];
    const { author, body } = comment;

    return {
        author,
        body
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createComment: data => dispatch(createComment(data)),
        updateComment: (commentId, data) => dispatch(updateComment(commentId, data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);
