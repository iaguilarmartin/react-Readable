import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import Comment from './Comment';
import SelectOrder from './SelectOrder';
import EditComment from './EditComment';

class CommentsList extends Component {
    state = {
        showEditDialog: false,
        editingComment: null
    };

    deleteComment(commentId) {
        this.props.onDeleted(commentId);
        this.setState({
            editingComment: null,
            showEditDialog: false
        });
    }

    editComment(comment) {
        this.setState({
            editingComment: comment,
            showEditDialog: true
        });
    }

    closeEditCommentDialog = () => this.setState({showEditDialog: false});

    render() {
        const { comments, order, postId, onVoted, onOrderChanged } = this.props;

        let commentsList = comments.filter(comment => !comment.deleted);
        commentsList.sort((a, b) =>
            order === 'score' ? b.voteScore - a.voteScore : b.timestamp - a.timestamp
        );

        return (
            <div className="section">
                <h5>Comments</h5>
                <SelectOrder initialValue={order}  onOrderChanged={c => onOrderChanged(c)}/>
                <ul className="collection col s12 comments-container">
                    {commentsList.map(comment => (
                        <Comment key={comment.id}
                                 comment={comment}
                                 onVote={(id, p) => onVoted(id, p)}
                                 onEdit={() => this.editComment(comment)}
                        />
                    ))}

                    <li className="collection-item new-comment">
                        <span className="title">Add new comment</span>
                        <div className="row">
                            <EditComment commentSaved={this.closeEditCommentDialog}/>
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
                            <EditComment comment={this.state.editingComment} commentSaved={this.closeEditCommentDialog}/>
                            <a onClick={() => this.deleteComment(this.state.editingComment)} className="waves-effect waves-red btn-flat"><i className="material-icons left">delete</i>Delete</a>
                        </div>
                    )}
                </Modal>
            </div>
        );
    }
}

CommentsList.propTypes = {
    order: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
    onVoted: PropTypes.func.isRequired,
    onDeleted: PropTypes.func.isRequired,
    onOrderChanged: PropTypes.func.isRequired,
};

export default CommentsList;
