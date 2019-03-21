import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo.jsx';

class Header extends Component {
    render() {
        return (
            <header>
                <div className="container">
                    <Logo />
                    <nav className="clear-fix">
                        <div className="user-nav">
                            <ul className="clear-fix">
                                <li>                                    
                                    <Link to="#" replace>
                                        Zarejestruj
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" replace>
                                        Zaloguj
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" replace>
                                        Koszyk
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="main-nav">
                            <ul className="clear-fix">
                                <li>
                                    <Link to="#" replace>
                                        Damskie
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" replace>
                                        Męskie
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" replace>
                                        Dziecięce
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
