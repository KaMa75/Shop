import React, { Component } from 'react';
import Logo from '../Logo.jsx';
import { userNav, loggedUserNav, mainNav } from '../../data/navData';
import Navigation from '../Navigation.jsx';

class Header extends Component {
    render() {
        let userNavigation = (this.props.loggedIn) ? loggedUserNav : userNav;
        return (
            <header>
                <div className="container">
                    <Logo />
                    <nav className="clear-fix">
                        <Navigation
                            navLinks={ userNavigation }
                            className="user-nav"
                        />
                        <Navigation
                            navLinks={ mainNav }
                            className="main-nav"
                        />
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
