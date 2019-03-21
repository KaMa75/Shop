import React, { Component } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Routes from './Routes.jsx';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Routes />
            </HashRouter>
        );
    }
}

export default App;
