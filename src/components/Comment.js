import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Score from './Score';

const Comment = function(props) {
    const {timestamp, author, id, voteScore, body} = props.comment;

    const dateString = moment(timestamp).format('LL');

    return (
        <li className="collection-item avatar comment">
            <i className="material-icons" onClick={p => props.onEdit()}>edit</i>
            <span className="title red-text text-lighten-1">{author}</span>
            <p>
                {body}
            </p>
            <label>{dateString}</label>
            <Score score={voteScore} onVote={p => props.onVote(id, p)}/>
        </li>
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    onVote: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default Comment;