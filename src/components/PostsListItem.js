import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

const PostsListItem = function (props) {
    const timeFromNow = moment(props.timestamp).fromNow();

    return (
        <div key={props.id} className="col s12 m6">
            <div className="card">
                <div className="card-content">
                    <small className="grey-text text-lighten-1">{timeFromNow}</small>
                    <p>{props.title}</p>
                </div>
                <div className="card-action">
                    <Link to={{pathname: "/post/" + props.id}}>Read more</Link>
                    <span className="new badge red" data-badge-caption={'Score: ' + props.score} />
                </div>
            </div>
        </div>
    );
};

PostsListItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired
};

export default PostsListItem;