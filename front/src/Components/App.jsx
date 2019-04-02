import React, { Component } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import axios from 'axios';
import Routes from './Routes.jsx';
import Loading from './Loading.jsx';
import Error from './Error.jsx';

const urlAuth = '/api/users/auth';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                isAuth: false,
                isAdmin: false
            },
            isLoaded: false,
            isError: false
        };
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
            this.setAppState('isLoaded', true);
        })
        .catch(error => {
            this.setAppState('isError', true);
            console.log(error);
        });
    }

    render() {
        if(this.state.isLoaded) {
            return (
                <HashRouter>
                    <Routes
                        userData={ this.state.user }
                        setAppState={ this.setAppState }
                    />
                </HashRouter>
            );
        }
        if(this.state.isError) {
            return <Error />;
        }
        return <Loading />
    }

}

export default App;
