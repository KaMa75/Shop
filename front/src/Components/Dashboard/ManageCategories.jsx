import React, { Component } from 'react';
import LayoutDashboard from '../LayoutDashboard.jsx';

class ManageCategories extends Component {
    render() {
        return (
            <LayoutDashboard
                isAdmin={ this.props.userData.isAdmin }
            >
                <div className="user-nfo-panel-wrapper">                    
                    <div>
                        Kategorie
                    </div>
                </div>
            </LayoutDashboard>
        );
    }
}

export default ManageCategories;
