import React, { Component } from 'react';
import axios from 'axios';

const urlLogout = '/api/user/logout';

class Logout extends Component {
    componentDidMount() {
        const logoutData = {
            isAuth: false,
            isAdmin: false
        }
        axios.get(urlLogout)
        .then(response => {
            if(response.status === 200) {
                return response.data;
            } else {
                throw new Error('Błąd połączenia');
            }
        })
        .then(response => {
            if(response.success) {
                this.props.setAppState('user', logoutData);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
    render() {
        return (
            <div>
                logout
            </div>
        );
    }
}

export default Logout;
