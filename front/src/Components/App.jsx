import React, { Component } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Routes from './Routes.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoggedIn: false
        }
    }
    setUserLoggedState = (value) => {
        this.setState({
            userLoggedIn: value
        });
    }
    render() {
        return (
            <HashRouter>
                <Routes
                    loggedIn={ this.state.userLoggedIn }
                    setUserState={ this.setUserLoggedState }
                />
            </HashRouter>
        );
    }
}

export default App;
