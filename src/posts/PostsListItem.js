import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import Score from '../app/Score';

const PostsListItem = function (props) {
    const timeFromNow = moment(props.timestamp).fromNow();

    return (
        <div key={props.id} className="col s12">
            <div className="card">
                <div className="card-content">
                    <div className="row" style={{marginBottom: 0}}>
                        <div className="col s10">
                            <small className="grey-text text-lighten-1">{timeFromNow} by <b>{props.author}</b></small>
                            <p>{props.title}</p>
                        </div>
                        <div className="col s2 post-resume">
                            <Score score={props.score} disable={props.voting} onVote={p => props.onVote(props.id, p)} isSmall/>
                        </div>
                    </div>

                </div>
                <div className="card-action">
                    <Link className="orange-text text-accent-1" to={{pathname: `/${props.category}/${props.id}`}}>Read more</Link>
                    <Link className="orange-text text-darken-4" to={{pathname: `/${props.category}/${props.id}/edit`}}>Edit</Link>
                    <span className="new badge red" data-badge-caption={'Comments: ' + props.comments} />
                </div>
            </div>
        </div>
    );
};

PostsListItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    onVote: PropTypes.func.isRequired,
    voting: PropTypes.bool.isRequired
};

export default PostsListItem;