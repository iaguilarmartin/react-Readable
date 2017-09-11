import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    state = {
        categories: [
            {
                name: 'react',
                path: 'react'
            },
            {
                name: 'redux',
                path: 'redux'
            },
            {
                name: 'udacity',
                path: 'udacity'
            }
        ]
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link className="brand-logo right" to="/">Readable</Link>
                    <ul id="nav-mobile" className="left">
                        <li><Link to="/">All</Link></li>
                        {this.state.categories.map(category => (
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

export default Nav;
