import React from 'react';
import PropTypes from 'prop-types';

const FloatingButton = function (props) {
    return (
        <div className={props.fixed && "fixed-action-btn"}>
            <a className="btn-floating btn-large red">
                <i onClick={props.btnClick} className="large material-icons">{props.icon}</i>
            </a>
        </div>
    );
};

FloatingButton.propTypes = {
    icon: PropTypes.string.isRequired,
    fixed: PropTypes.bool,
    btnClick: PropTypes.func.isRequired
};

export default FloatingButton;