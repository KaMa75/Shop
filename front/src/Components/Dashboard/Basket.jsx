import React, { Component } from 'react';
import LayoutDashboard from '../LayoutDashboard.jsx';
import axios from 'axios';

const url = 'api/product/articles_by_id';

class Basket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    calcSum() {
        return this.state.products.map( product => product.price)
            .reduce( (curr, next) => curr + next);
    }

    getProducts() {
        if(this.props.userData.cart.length !== 0) {
            const queryIDs = this.props.userData.cart.join(',');
            axios.get(`${url}/?id=${queryIDs}&searchType=array`)
            .then(response => {
                if(response.status === 200) {
                    return response.data;
                } else {
                    throw new Error('Błąd połączenia');
                }
            })
            .then(response => {
                this.setState({
                    products: response
                });
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    delProduktFromBasket = (id, deleteAll=false) => () => {
        let productsData = this.state.products;
        if(deleteAll) {
            productsData = [];
        } else {
            const index = productsData.map( product => product._id ).indexOf(id);
            productsData.splice(index, 1);
        };
        this.setState({
            products: productsData
        });
        this.props.delFromBasket(id, deleteAll);
    }

    genProductsList() {
        return this.state.products.map( product => (
            <li key={ product._id }
                className="clear-fix"
            >
                <div
                    className='product-name'
                >
                    <h4>
                        { `${product.name} ${product.manufacturer.name}` }
                    </h4>
                    <p>
                        {`${product.model}`}
                    </p>
                </div>
                <div
                    className='product-price'
                >
                    <h2>
                        { `${product.price.toFixed(2)} zł`}
                    </h2>
                </div>
                <div className='del-btn'>
                    <button
                        onClick={ this.delProduktFromBasket(product._id) }
                    >
                        Usuń z koszyka
                    </button>
                </div>
            </li>
        ));
    }

    renderProductsList() {
        if(this.state.products.length === 0) {
            return (
                <p>
                    Nie masz żanych produktów w koszyku
                </p>
            );
        }
        return (
            <div>
                <div className="basket-product-list">
                    <ul>
                        { this.genProductsList() }
                        <li className="clear-fix">
                            <div
                                className='product-name'
                            >
                                <p>
                                    Do zapłaty:
                                </p>
                            </div>
                            <div
                                className='product-price'
                            >
                                <h2>
                                    { `${this.calcSum().toFixed(2)} zł` }
                                </h2>
                            </div>
                            <div
                                className='del-btn'
                            >
                                <button
                                    onClick={ this.delProduktFromBasket(null, true) }
                                >
                                    Usuń wszystkie
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getProducts();
    }

    render() {
        return (
            <LayoutDashboard
                isAdmin={ this.props.userData.isAdmin }
            >
                <div className="user-nfo-panel-wrapper">
                    <h3>Produkty w koszyku</h3>
                    <div className="user-nfo-panel">
                        { this.renderProductsList() }
                    </div>
                </div>
            </LayoutDashboard>
        );
    }
}

export default Basket;
