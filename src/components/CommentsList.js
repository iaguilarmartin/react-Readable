import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import Comment from './Comment';
import SelectOrder from './SelectOrder';
import EditComment from './EditComment';
import { orderComments, voteComment, deleteComment } from '../actions/commentsActions';

class CommentsList extends Component {
    state = {
        showEditDialog: false,
        editingComment: null
    };

    commentVoted(commentId, positive) {
        this.props.addVote(commentId, positive);
    }

    deleteComment(commentId) {
        this.props.deleteComment(commentId);
        this.setState({
            editingComment: null,
            showEditDialog: false
        });
    }

    editComment(commentId) {
        this.setState({
            editingComment: commentId,
            showEditDialog: true
        });
    }

    sortComments(criteria) {
        this.props.changeOrder(criteria);
    }

    closeEditCommentDialog = () => this.setState({showEditDialog: false});

    render() {
        const { comments, order, postId } = this.props;

        return (
            <div className="section">
                <h5>Comments</h5>
                <SelectOrder initialValue={order}  onOrderChanged={c => this.sortComments(c)}/>
                <ul className="collection col s12 comments-container">
                    {comments.map(comment => (
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
                            <EditComment postId={postId}/>
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
                            <EditComment commentId={this.state.editingComment} postId={postId} commentSaved={this.closeEditCommentDialog}/>
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

function mapStateToProps({comments}, ownProps) {
    const order = comments.sortBy;
    let commentsList = Object.keys(comments.items).map(key => comments.items[key]);
    commentsList = commentsList.filter(comment => comment.parentId === ownProps.postId && !comment.deleted);

    commentsList.sort((a, b) =>
        order === 'score' ? b.voteScore - a.voteScore : b.timestamp - a.timestamp
    );

    return {
        order,
        comments: commentsList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeOrder: criteria => dispatch(orderComments(criteria)),
        addVote: (commentId, positive) => dispatch(voteComment(commentId, positive)),
        deleteComment: commentId => dispatch(deleteComment(commentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
