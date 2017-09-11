import React from 'react';
import PropTypes from 'prop-types';

const Score = function (props) {
    return (
        <div className="vote-score">
            <i>Score: </i> <span className="orange-text text-accent-2">{props.score}</span>
            <a onClick={() => props.onVote(true)} className="waves-effect waves-light btn"><i className="material-icons">thumb_up</i></a>
            <a onClick={() => props.onVote(false)} className="waves-effect waves-light red lighten-2 btn"><i className="material-icons">thumb_down</i></a>
        </div>
    )
};

Score.propTypes = {
    score: PropTypes.number.isRequired,
    onVote: PropTypes.func.isRequired
};

export default Score;