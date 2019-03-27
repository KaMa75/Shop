import React, { Component } from 'react';
import LayoutDashboard from '../LayoutDashboard.jsx';
import Button from '../Button.jsx';

class Dashboard extends Component {
    render() {
        return (
            <LayoutDashboard>
                <div className="user-nfo-panel-wrapper">
                    <h3>Informacje o użytkowniku</h3>
                    <div className="user-nfo-panel">
                        <p>name</p>
                        <p>lastname</p>
                        <p>email</p>
                        <Button
                            linkTo='/user/user_profile'
                        >
                            Edytuj dane
                        </Button>
                    </div>
                </div>
                <div className="user-nfo-panel-wrapper">
                    <h3>Historia zakupów</h3>
                    <div className="user-nfo-panel">
                        <span>historia</span>
                    </div>
                </div>
            </LayoutDashboard>
        );
    }
}

export default Dashboard;
