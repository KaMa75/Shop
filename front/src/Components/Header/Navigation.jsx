import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
    generateLinks() {
        return this.props.navLinks.map((item, index) => {
            return (
                <li key={ index }>
                    <Link to={ item.link } replace>
                        { item.name }
                    </Link>
                </li>
            );
        });
    }
    render() {
        return (
            <div className={ this.props.className }>
                <ul className="clear-fix">
                    { this.generateLinks() }
                </ul>
            </div>
        );
    }
}

export default Navigation;
