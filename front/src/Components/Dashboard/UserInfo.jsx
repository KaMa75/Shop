import React, { Component } from 'react';
import LayoutDashboard from '../LayoutDashboard.jsx';

class UserInfo extends Component {
    render() {
        return (
            <LayoutDashboard
                isAdmin={ this.props.userData.isAdmin }
            >
                <div className="user-nfo-panel-wrapper">                    
                    <div>
                        Dane użytkownika
                    </div>
                </div>
            </LayoutDashboard>
        );
    }
}

export default UserInfo;
