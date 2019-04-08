import React, { Component } from 'react';
import LayoutDashboard from '../LayoutDashboard.jsx';

class Basket extends Component {
    render() {
        return (
            <LayoutDashboard
                isAdmin={ this.props.userData.isAdmin }
            >
                <div className="user-nfo-panel-wrapper">                    
                    <div>
                        Koszyk
                    </div>
                </div>
            </LayoutDashboard>
        );
    }
}

export default Basket;
