import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditComment extends Component {

    state = {
        author: "",
        body: ""
    };

    componentWillMount() {
        if (this.props.commentId) {
            const comment = {
                id: '894tuq4ut84ut8v4t8wun89g',
                parentId: "8xf0y6ziyjabvozdd253nd",
                timestamp: 1468166872634,
                body: 'Hi there! I am a COMMENT.',
                author: 'thingtwo',
                voteScore: 6,
                deleted: false,
                parentDeleted: false
            };

            this.state.author = comment.author;
            this.state.body = comment.body;
        }
    }

    createComment(e) {
        e.preventDefault();

        console.log(e.target.author.value, e.target.body.value);

        this.props.commentSaved && this.props.commentSaved();
    }

    handleInputChange(e) {
        this.setState({
           [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <form onSubmit={e => this.createComment(e)}>
                <div className="input-field col s6">
                    <input id="authorInput" type="text" name="author" value={this.state.author} onChange={e => this.handleInputChange(e)} className="validate" placeholder="e.g. trinity"/>
                    <label className="active" htmlFor="authorInput">Author</label>
                </div>
                <div className="col s12">
                    <label htmlFor="bodyInput">Body</label>
                    <textarea id="bodyInput" name="body" className="grey lighten-4" value={this.state.body} onChange={e => this.handleInputChange(e)} rows="5"/>
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
    commentSaved: PropTypes.func
}

export default EditComment;
