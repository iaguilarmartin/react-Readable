import React from 'react';
import PropTypes from 'prop-types';

const SelectOrder = function (props) {
    return (
        <div className="col s12 m4">
            <label>Order by</label>
            <select onChange={(e) => props.onOrderChanged(e.target.value)} className="browser-default">
                <option value="score">Score</option>
                <option value="date">Date</option>
            </select>
        </div>
    );
};

SelectOrder.propTypes = {
    onOrderChanged: PropTypes.func.isRequired
};

export default SelectOrder;
