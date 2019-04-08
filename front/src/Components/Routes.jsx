import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './Layout.jsx';
import MainPage from './MainPage/MainPage.jsx';
import Register from './Register_login/Register.jsx';
import Login from './Register_login/Login.jsx';
import Logout from './Logout.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Shop from './Shop/Shop.jsx';

const Routes = (props) => {
    const {userData, setAppState} = props;
    return (
        <Layout
            loggedIn={ userData.isAuth }
        >
            <Switch>
                <Route exact path='/' component={ MainPage } />
                <Route exact path='/register' component={ Register } />
                <Route exact path='/shop' component={ Shop } />
                <Route exact path='/user/dashboard' render={ () => (
                    !userData.isAuth ? (
                        <Redirect to='/login' />
                        ) : (
                            <Dashboard
                                userData={ userData }
                                setAppState={ setAppState }
                            />
                            )
                )} />
                <Route exact path='/user/logout' render={ () => (
                    !userData.isAuth ? (
                        <Redirect to='/' />
                    ) : (
                        <Logout
                            setAppState={ setAppState }
                        />
                    )
                )} />
                <Route exact path='/login' render={ () => (
                    userData.isAuth ? (
                        <Redirect to='/user/dashboard' />
                    ) : (
                        <Login
                            loggedIn={ userData.isAuth }
                            setAppState={ setAppState }
                        />
                    )
                )} />
            </Switch>
        </Layout>
    );
};

export default Routes;
