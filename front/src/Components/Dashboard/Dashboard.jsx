import React, { Component } from 'react';
import LayoutDashboard from '../LayoutDashboard.jsx';
import Button from '../Button.jsx';

class Dashboard extends Component {
    render() {
        const {name, lastName, street, houseNumber, postCode, city, email, phone} = this.props.userData;
        return (
            <LayoutDashboard
                isAdmin={ this.props.userData.isAdmin }
            >
                <div className="user-nfo-panel-wrapper">
                    <h3>Informacje o użytkowniku</h3>
                    <div className="user-nfo-panel">
                        <p>{ `${name} ${lastName}` }</p>
                        <p>{ `ul. ${street} ${houseNumber}` }</p>
                        <p>{ `${postCode} ${city}` }</p>
                        <p>{ `e-mail: ${email}` }</p>
                        <p>{ `telefon: ${phone}` }</p>
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
