import React from 'react';
import ReactDOM from 'react-dom';
import "../scss/style.scss";

import App from './Components/App.jsx';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
