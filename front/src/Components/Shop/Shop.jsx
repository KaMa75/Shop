import React, { Component } from 'react';
import ShopPageTop from '../ShopPageTop.jsx';
import CheckBox from './CheckBox.jsx';
import RadioBox from './RadioBox.jsx';
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
            reqSet: initRequestSettings
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

    getProducts() {
        const filters = this.state.filters;
        const settings = {
            ...this.state.reqSet,
            filters
        }
        axios.post(urlShopProducts, settings)
            .then(response => {
                if(response.status === 200) {
                    console.log(response)
                    return response.data;
                } else {
                    throw new Error('Błąd połączenia');
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
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
        console.log(this.state.filters);
        return (
            <div className='shop-page'>
                <ShopPageTop>
                    Znajdź buty dla siebie
                </ShopPageTop>
                <div className="container">
                    <div className="shop-wrapper">
                        <div className="shop-filters">
                            { (this.state.manufacturers.length > 0) && (
                                <CheckBox
                                    open={ true }
                                    title='Producent'
                                    list={ this.state.manufacturers }
                                    handleFilters={ (filters) => this.handleFilters(filters, 'manufacturers') }
                                />
                            ) }
                            { (this.state.materials.length > 0) && (
                                <CheckBox
                                    open={ false }
                                    title='Materiał'
                                    list={ this.state.materials }
                                    handleFilters={ (filters) => this.handleFilters(filters, 'materials') }
                                />
                            ) }
                            { (this.state.destinys.length > 0) && (
                                <CheckBox
                                    open={ false }
                                    title='Przeznaczenie'
                                    list={ this.state.destinys }
                                    handleFilters={ (filters) => this.handleFilters(filters, 'destinys') }
                                />
                            ) }
                            { (this.state.types.length > 0) && (
                                <CheckBox
                                    open={ false }
                                    title='Typ'
                                    list={ this.state.types }
                                    handleFilters={ (filters) => this.handleFilters(filters, 'types') }
                                />
                            ) }
                            { (price.length > 0) && (
                                <RadioBox
                                    open={ true }
                                    title='Cena'
                                    list={ price }
                                    handleFilters={ (filters) => this.handleFilters(filters, 'price') }
                                />
                            ) }
                        </div>
                        <div className="shop-products">

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Shop;
