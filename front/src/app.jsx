import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App.jsx';

import "../scss/style.scss";
const cookie = document.cookie;
const isToken = (cookie.indexOf('w_auth') >= 0) ? true : false;


document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App isToken={ isToken } />,
        document.getElementById('app')
    );
});
