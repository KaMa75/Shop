import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App.jsx';

import "../scss/style.scss";

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
