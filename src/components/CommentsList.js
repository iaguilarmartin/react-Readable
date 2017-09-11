import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import Comment from './Comment';
import SelectOrder from './SelectOrder';
import EditComment from './EditComment';

class CommentsList extends Component {
    state = {
        showEditDialog: false,
        editingComment: null,
        comments: [
            {
                id: '894tuq4ut84ut8v4t8wun89g',
                parentId: "8xf0y6ziyjabvozdd253nd",
                timestamp: 1468166872634,
                body: 'Hi there! I am a COMMENT.',
                author: 'thingtwo',
                voteScore: 6,
                deleted: false,
                parentDeleted: false
            },
            {
                id: '8tu4bsun805n8un48ve89',
                parentId: "8xf0y6ziyjabvozdd253nd",
                timestamp: 1469479767190,
                body: 'Comments. Are. Cool.',
                author: 'thingone',
                voteScore: -5,
                deleted: false,
                parentDeleted: false
            }
        ]
    };

    commentVoted(commentId, positive) {
        console.log('New vote for comment', commentId, positive);
    }

    editComment(commentId) {
        this.setState({
            editingComment: commentId,
            showEditDialog: true
        });
    }

    deleteComment(commentId) {
        console.log(commentId);
    }

    sortComments(criteria) {
        console.log(criteria);
    }

    closeEditCommentDialog = () => this.setState({showEditDialog: false});

    render() {
        const parentId = this.props.postId;

        return (
            <div className="section">
                <h5>Comments</h5>
                <SelectOrder onOrderChanged={c => this.sortComments(c)}/>
                <ul className="collection col s12 comments-container">
                    {this.state.comments.map(comment => (
                        <Comment key={comment.id}
                                 id={comment.id}
                                 author={comment.author}
                                 score={comment.voteScore}
                                 text={comment.body}
                                 timestamp={comment.timestamp}
                                 onVote={(id, p) => this.commentVoted(id, p)}
                                 onEdit={(id) => this.editComment(id)}
                        />
                    ))}

                    <li className="collection-item new-comment">
                        <span className="title">Add new comment</span>
                        <div className="row">
                            <EditComment/>
                        </div>
                    </li>
                </ul>

                <Modal
                    className='popup'
                    overlayClassName='overlay'
                    isOpen={this.state.showEditDialog}
                    onRequestClose={this.closeEditCommentDialog}
                    contentLabel='Modal'>

                    {this.state.showEditDialog && (
                        <div className="new-comment">
                            <span className="close" onClick={this.closeEditCommentDialog}>X</span>
                            <h5 className="title">Edit comment</h5>
                            <EditComment commentId={this.state.editingComment} commentSaved={this.closeEditCommentDialog}/>
                            <a onClick={() => this.deleteComment(this.state.editingComment)} className="waves-effect waves-red btn-flat"><i className="material-icons left">delete</i>Delete</a>
                        </div>
                    )}
                </Modal>
            </div>
        );
    }
}

CommentsList.propTypes = {
    postId: PropTypes.string.isRequired
};

export default CommentsList;
