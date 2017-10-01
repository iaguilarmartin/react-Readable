import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../categories/categoriesActions';

class Nav extends Component {
	componentDidMount () {
		this.props.fetchCategories();
	}

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link className="brand-logo right" to="/">Readable</Link>
                    <ul id="nav-mobile" className="left">
                        <li><Link to="/">All</Link></li>
                        {this.props.categories.map(category => (
                            <li key={category.path}><Link to={{
                                pathname: '/',
                                search: '?category=' + category.path
                            }}>{category.name}</Link></li>
                        ))}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({categories}) {
    return {
        categories: categories.items
    }
}

export default connect(mapStateToProps, actions)(Nav);
