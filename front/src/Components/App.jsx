import React, { Component } from 'react';
// import axios from 'axios';

class App extends Component {
    componentDidMount() {
        fetch('/api/product/articles')
            .then(response => response.json())
            .then(response => {
                console.log(response)
            });
        // axios.get('/api/users/auth')
        //     .then(response => {
        //         console.log(response)
        //     });
    }
    render() {
        return (
            <div>
                test
            </div>
        );
    }
}

export default App;
