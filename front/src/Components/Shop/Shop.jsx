import React, { Component } from 'react';
import ShopPageTop from '../ShopPageTop.jsx';
// import CheckBox from './CheckBox.jsx';
// import RadioBox from './RadioBox.jsx';
import FilteredProducts from './FilteredProducts.jsx';
import FiltersSection from './FiltersSection.jsx';
import axios from 'axios';

import { price } from '../../configData/priceFilters';
import { initRequestSettings } from '../../configData/shopRequestSettings';

const urlManufacturers = '/api/product/manufacturers';
const urlMaterials = '/api/product/materials';
const urlDestinys = '/api/product/destinys';
const urlTypes = '/api/product/types';
const urlShopProducts = '/api/product/shop';

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            manufacturers: [],
            materials: [],
            destinys: [],
            types: [],
            filters: {
                manufacturers: [],
                materials: [],
                destinys: [],
                types: [],
                price: []
            },
            reqSet: initRequestSettings,
            products: [],
            showLoadMoreBtn: false,
            productsIsLoaded: false
        }
    }

    getData(url, stateName) {
        axios.get(url)
            .then(response => {
                if(response.status === 200) {
                    return response.data;
                } else {
                    throw new Error('Błąd połączenia');
                }
            })
            .then(response => {
                this.setState({
                    [stateName]: response
                });
            })
            .catch(error => {
                console.log(error);
        });
    }

    getManufacturers() {
        this.getData(urlManufacturers, 'manufacturers');
    }

    getMaterials() {
        this.getData(urlMaterials, 'materials');
    }

    getDestinys() {
        this.getData(urlDestinys, 'destinys');
    }

    getTypes() {
        this.getData(urlTypes, 'types');
    }

    getProducts(resetProducts=true) {
        this.setState({
            productsIsLoaded: false
        });
        const {
            manufacturers: manufacturer,
            materials: material,
            destinys: destiny,
            types: type,
            price
        } = this.state.filters;
        const filters = {
            manufacturer,
            material,
            destiny,
            type,
            price
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
        this.getManufacturers();
        this.getMaterials();
        this.getDestinys();
        this.getTypes();
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
        return (
            <div className='shop-page'>
                <ShopPageTop>
                    Znajdź buty dla siebie
                </ShopPageTop>
                <div className="container">
                    <div className="shop-wrapper">
                        <FiltersSection
                            handleFilters={ this.handleFilters }
                            manufacturers={ this.state.manufacturers }
                            materials={ this.state.materials }
                            destinys={ this.state.destinys }
                            types={ this.state.types }
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
