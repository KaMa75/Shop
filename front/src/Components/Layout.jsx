import React, { Component } from 'react';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';

class Layout extends Component {
    render() {
        return (
            <div>
                <Header
                    loggedIn={ this.props.loggedIn }
                    typesForMenu={ this.props.typesForMenu }
                />
                    { this.props.children }
                <Footer />
            </div>
        );
    }
}

export default Layout;
