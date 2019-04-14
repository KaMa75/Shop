import React, { Component } from 'react';
import Button from './Button.jsx';

class ProductCard extends Component {

    genCardImage = (images) => {
        if(images.length > 0) {
            return images[0].url;
        } else {
            return '/images/img_not_available.jpg';
        }
    };

    addToBasket = (id) => () => {
        this.props.addToBasket(id);
    }
    
    render() {
        return (
            <div className='product-card-container'>
                <div className="product-image">
                    <img src={ this.genCardImage(this.props.images) } alt=""/>
                </div>
                <div className="product-card-content">
                    <h4>{ this.props.name }</h4>
                    <h2>{ this.props.manufacturer.name }</h2>
                    <h4>{ this.props.model }</h4>
                    <h2>{ `${this.props.price.toFixed(2)} zł` }</h2>
                </div>
                <div className="product-card-buttons">
                    <Button
                        linkTo={`/product_details/${this.props._id}`}
                    >
                        Zobacz produkt
                    </Button>
                    <button
                        onClick={ this.addToBasket(this.props._id) }
                    >
                        Do koszyka
                    </button>
                </div>
            </div>
        );
    }
}

export default ProductCard;
