import React, { Component } from 'react';
import LayoutDashboard from '../LayoutDashboard.jsx';

class AdminInfo extends Component {
    render() {
        return (
            <LayoutDashboard
                isAdmin={ this.props.userData.isAdmin }
            >
                <div className="user-nfo-panel-wrapper">                    
                    <div>
                        Admin info
                    </div>
                </div>
            </LayoutDashboard>
        );
    }
}

export default AdminInfo;
