import React, { Component } from 'react';
import ShopPageTop from '../ShopPageTop.jsx';
import CheckboxBox from './CheckboxBox.jsx';
import axios from 'axios';

const urlManufacturers = '/api/product/manufacturers';
const urlMaterials = '/api/product/materials';
const urlDestinys = '/api/product/destinys';
const urlTypes = '/api/product/types';

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            manufacturers: [],
            materials: [],
            destinys: [],
            types: []
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

    componentDidMount() {
        this.getManufacturers();
        this.getMaterials();
        this.getDestinys();
        this.getTypes();
    }

    handleFilters = () => {
        //-------
        console.log('filtrowanie');
    }

    render() {
        return (            
            <div className="container">
                <ShopPageTop>
                    Znajdź buty dla siebie
                </ShopPageTop>
                <div className="shop-wrapper">
                    <div className="shop-filters">
                        { (this.state.manufacturers.length > 0) && (
                            <CheckboxBox
                                collapsed={ false }
                                title='Producent'
                                list={ this.state.manufacturers }
                                actionFilters={ this.handleFilters }
                            />
                        ) }
                    </div>
                    <div className="shop-products">

                    </div>
                </div>
            </div>
        );
    }

}

export default Shop;
