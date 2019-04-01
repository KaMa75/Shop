import React, { Component } from 'react';
import axios from 'axios';
import MainSlider from './MainSlider.jsx';
import MainPromotion from './MainPromotion.jsx';
import ProductsBlock from './ProductsBlock.jsx';

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
            this.setState({
                productsBySell: response
            });
        });
    }

    getProductsByArrival() {
        axios.get(`${urlArticles}?sortBy=createdAt&order=desc&limit=4`)
        .then(response => response.data)
        .then(response => {
            this.setState({
                productsByArrival: response
            });
        });
    }

    componentDidMount() {
        this.getProductsBySell();
        this.getProductsByArrival();
    }

    render() {
        return (
            <div className='main-page'>
                <MainSlider />
                <ProductsBlock
                    products={ this.state.productsBySell }
                    title='Najczęściej kupowane'
                />
                <MainPromotion />
                <ProductsBlock
                    products={ this.state.productsByArrival }
                    title='Najnowsze produkty'
                />
            </div>
        );
    }

}

export default MainPage;
