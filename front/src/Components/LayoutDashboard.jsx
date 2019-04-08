import React, { Component } from 'react';
import Navigation from './Navigation.jsx';
import { dashUserNav, dashAdminNav } from '../configData/dashNavData';

class LayoutDashboard extends Component {
    showIfAdmin() {
        return this.props.userData.isAdmin ? (
            <div className="dash-admin-nav">
                <h3>
                    Panel administratora
                </h3>
                <Navigation
                    navLinks={ dashAdminNav }
                    className="dash-nav"
                />
            </div>
        ) : null;
    }
    render() {
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="dashboard-navigation">
                        <div className="dash-user-nav">
                            <h3>
                                Moje konto
                            </h3>
                            <Navigation
                                navLinks={ dashUserNav }
                                className="dash-nav"
                            />
                        </div>
                        { this.showIfAdmin() }
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
