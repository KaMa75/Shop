import React, { Component } from 'react';
import ShopPageTop from '../ShopPageTop.jsx';
import ProductInfo from './ProductInfo.jsx';
import ProductDescription from './ProductDescription.jsx';
import ProductImages from './ProductImages.jsx';
import axios from 'axios';

const url = 'api/product/articles_by_id';

class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
    }

    getProductDetail(id) {
        axios.get(`${url}/?id=${id}&searchType=single`)
        .then(response => {
            if(response.status === 200) {
                return response.data[0];
            } else {
                throw new Error('Błąd połączenia');
            }
        })
        .then(response => {
            this.setState({
                product: response
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    addToBasket = (id) => () => {
        console.log('buy' + id);
        this.props.addToBasket(id);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getProductDetail(id);
    }

    render() {
        return (
            <div className='shop-page'>
                <ShopPageTop>
                    Informacje o produkcie
                </ShopPageTop>
                <div className="container product-details">
                    <div className="product-details-container clear-fix">
                        <div className="product-images">
                            <ProductImages
                                images={ this.state.product.images }
                            />
                        </div>
                        <div className="product-info">
                            <ProductInfo
                                data={ this.state.product }
                                addToBasket={ this.addToBasket }
                            />
                        </div>
                    </div>
                    <div className="product-descr">
                        <ProductDescription
                            description={ this.state.product.description }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetail;
