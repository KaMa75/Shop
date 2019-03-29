import React, { Component } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import axios from 'axios';
import Routes from './Routes.jsx';
const urlAuth = '/api/users/auth';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                isAuth: this.props.isToken,
                isAdmin: false
            }
        }
    }

    setAppState = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        axios.get(urlAuth)
        .then(response => {
            if(response.status === 200) {
                return response.data;
            } else {
                throw new Error('Błąd połączenia');
            }
        })
        .then(response => {
            this.setAppState('user', response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <HashRouter>
                <Routes
                    userData={ this.state.user }
                    setAppState={ this.setAppState }
                />
            </HashRouter>
        );
    }

}

export default App;
