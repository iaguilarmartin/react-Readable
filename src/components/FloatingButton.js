import React from 'react';
import PropTypes from 'prop-types';

const FloatingButton = function (props) {
    return (
        <div className={props.fixed && "fixed-action-btn"}>
            <a className={`btn-floating ${ props.isSmall ? '' : 'btn-large'} ${props.backgroundColor || 'red'}`}>
                <i onClick={props.btnClick} className={`material-icons ${props.color || 'white'}-text`}>{props.icon}</i>
            </a>
        </div>
    );
};

FloatingButton.propTypes = {
	icon: PropTypes.string.isRequired,
	isSmall: PropTypes.bool,
	color: PropTypes.string,
	backgroundColor: PropTypes.string,
    fixed: PropTypes.bool,
    btnClick: PropTypes.func.isRequired
};

export default FloatingButton;