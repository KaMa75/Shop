import React, { Component } from 'react';
import ShopPageTop from '../ShopPageTop.jsx';
import FilteredProducts from './FilteredProducts.jsx';
import FiltersSection from './FiltersSection.jsx';
import axios from 'axios';

import { price } from '../../configData/priceFilters';
import { initRequestSettings } from '../../configData/shopRequestSettings';

const urlShopProducts = '/api/product/shop';

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filters: {
                manufacturer: [],
                material: [],
                destiny: [],
                type: [],
                price: []
            },
            reqSet: initRequestSettings,
            products: [],
            showLoadMoreBtn: false,
            productsIsLoaded: false
        }
    }

    getProducts(resetProducts=true) {
        this.setState({
            productsIsLoaded: false
        });
        const filters = {
            ...this.state.filters
        }
        const settings = {
            ...this.state.reqSet,
            filters
        }
        axios.post(urlShopProducts, settings)
            .then(response => {
                if(response.status === 200) {                    
                    return response.data.products;
                } else {
                    throw new Error('Błąd połączenia');
                }
            })
            .then(response => {
                const showLoadMoreBtn = (response.length > this.state.reqSet.limit) ? true : false;
                let productsToAdd = response.slice(0, this.state.reqSet.limit);
                let products;
                if(resetProducts) {
                    products = productsToAdd;
                } else {
                    products = [...this.state.products, ...productsToAdd];
                }
                this.setState({
                    products,
                    showLoadMoreBtn,
                    productsIsLoaded: true
                });
            })
            .catch(error => {
                console.log(error);
        });
    }
    
    loadMore = () => {
        const newReqSet = {...this.state.reqSet}
        newReqSet.skip = newReqSet.skip + newReqSet.limit;
        this.setState({
            reqSet: newReqSet
        }, () => {
            this.getProducts(false);
        });
    }

    componentDidMount() {
        this.getProducts();
    }

    findFilterPriceRange(id) {
        let range = [];
        for(let key in price) {
            if(price[key]._id === Number(id)) {
                range = [...price[key].range];
            }
        }
        return range;
    }

    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters};
        newFilters[category] = filters;

        if(category === 'price') {
            const priceRange = this.findFilterPriceRange(filters);
            newFilters[category] = priceRange;
        }

        this.setState({
            filters: newFilters,
            reqSet: initRequestSettings
        }, () => {
            this.getProducts();
        });
    }

    render() {
        const categories = { ...this.props.categoriesData };
        return (
            <div className='shop-page'>
                <ShopPageTop>
                    Znajdź buty dla siebie
                </ShopPageTop>
                <div className="container">
                    <div className="shop-wrapper">
                        <FiltersSection
                            handleFilters={ this.handleFilters }
                            manufacturers={ categories.manufacturers }
                            materials={ categories.materials }
                            destinys={ categories.destinys }
                            types={ categories.types }
                            price={ price }
                        />
                        <div className="shop-products">
                            <FilteredProducts
                                products={ this.state.products }
                                loadMore={ this.loadMore }
                                showLoadMoreBtn={ this.state.showLoadMoreBtn }
                                isLoaded={ this.state.productsIsLoaded }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Shop;
