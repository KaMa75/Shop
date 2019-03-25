import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './MainPage/MainPage.jsx';
import Register from './Register_login/Register.jsx';
import Login from './Register_login/Login.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';

const Routes = (props) => {
    const {loggedIn, setUserState} = props;
    return (
        <Switch>
            <Route exact path='/' component={ MainPage } />
            <Route exact path='/register' component={ Register } />
            <Route exact path='/user/dashboard' component={ Dashboard } />
            <Route exact path='/login' render={ () => (
                loggedIn ? (
                    <Redirect to='/user/dashboard' />
                ) : (
                    <Login
                        loggedIn={ loggedIn }
                        setUserState={ setUserState }
                    />
                )
            )} />
        </Switch>
    );
};

export default Routes;
