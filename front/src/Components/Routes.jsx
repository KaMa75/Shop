import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage.jsx';

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={ MainPage } />
        </Switch>
    );
};

export default Routes;
