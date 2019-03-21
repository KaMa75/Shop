import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage.jsx';
import Register from './Register_login/Register.jsx';
import Login from './Register_login/Login.jsx';

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={ MainPage } />
            <Route exact path='/register' component={ Register } />
            <Route exact path='/login' component={ Login } />
        </Switch>
    );
};

export default Routes;
