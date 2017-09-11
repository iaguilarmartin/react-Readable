import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Score from './Score';

const Comment = function(props) {
    const dateString = moment(props.timestamp).format('LL');

    return (
        <li className="collection-item avatar comment">
            <i className="material-icons" onClick={p => props.onEdit(props.id)}>edit</i>
            <span className="title red-text text-lighten-1">{props.author}</span>
            <p>
                {props.text}
            </p>
            <label>{dateString}</label>
            <Score score={props.score} onVote={p => props.onVote(props.id, p)}/>
        </li>
    );
};

Comment.propTypes = {
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    onVote: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default Comment;