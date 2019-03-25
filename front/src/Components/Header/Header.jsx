import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo.jsx';
import { userNav, loggedUserNav, mainNav } from '../../data/navData';

class Header extends Component {
    generateLinks(linksArray) {
        return linksArray.map((item, index) => {
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
        console.log(this.props.loggedIn)
        return (
            <header>
                <div className="container">
                    <Logo />
                    <nav className="clear-fix">
                        <div className="user-nav">
                            <ul className="clear-fix">
                                { (this.props.loggedIn) ? this.generateLinks(loggedUserNav) : this.generateLinks(userNav) }
                            </ul>
                        </div>
                        <div className="main-nav">
                            <ul className="clear-fix">
                                { this.generateLinks(mainNav) }
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
