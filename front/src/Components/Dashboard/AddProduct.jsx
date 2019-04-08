import React, { Component } from 'react';
import LayoutDashboard from '../LayoutDashboard.jsx';

class AddProduct extends Component {
    render() {
        return (
            <LayoutDashboard
                isAdmin={ this.props.userData.isAdmin }
            >
                <div className="user-nfo-panel-wrapper">                    
                    <div>
                        Dodaj produkt
                    </div>
                </div>
            </LayoutDashboard>
        );
    }
}

export default AddProduct;
