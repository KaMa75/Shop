import React, { Component } from 'react';
import Navigation from './Navigation.jsx';
import { dashUserNav } from '../data/dashNavData';

class LayoutDashboard extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="dashNav">
                        <h2>
                            Moje konto
                        </h2>
                        <Navigation
                            navLinks={ dashUserNav }
                            className="dash-nav"
                        />
                    </div>
                    <div className="dashUserContent">
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

export default LayoutDashboard;
