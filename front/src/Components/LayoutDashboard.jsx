import React, { Component } from 'react';
import Navigation from './Navigation.jsx';
import { dashUserNav } from '../configData/dashNavData';

class LayoutDashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="dashboard-navigation">
                        <h3>
                            Moje konto
                        </h3>
                        <Navigation
                            navLinks={ dashUserNav }
                            className="dash-nav"
                        />
                    </div>
                    <div className="dash-user-content">
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

export default LayoutDashboard;
