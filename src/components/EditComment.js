import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditComment extends Component {
    createComment(e) {
        e.preventDefault();

		this.props.commentSaved(e.target.author.value, e.target.body.value);

		e.target.reset();
    }

    render() {
        const { author, body } = this.props.comment || {};

        return (
            <form onSubmit={e => this.createComment(e)}>
                <div className="input-field col s6">
                    <input id="authorInput" type="text" disabled={this.props.comment !== undefined} name="author" defaultValue={author} className="validate" placeholder="e.g. trinity"/>
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
    comment: PropTypes.object,
    commentSaved: PropTypes.func.isRequired
};

export default EditComment;
