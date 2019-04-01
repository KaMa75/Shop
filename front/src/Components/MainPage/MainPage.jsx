import React, { Component } from 'react';
import axios from 'axios';
import MainSlider from './MainSlider.jsx';
import MainPromotion from './MainPromotion.jsx';

const urlArticles = '/api/product/articles';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productsBySell: [],
            productsByArrival: []
        };
    }

    getProductsBySell() {
        axios.get(`${urlArticles}?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data)
        .then(response => {
            console.log(response);
        })
    }



    render() {
        return (
            <div className='main-page'>
                <MainSlider />
                <div className='container'>
                    MainPage
                </div>
                <MainPromotion />
            </div>
        );
    }

}

export default MainPage;
