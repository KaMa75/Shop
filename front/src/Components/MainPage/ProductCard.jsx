import React from 'react';

const genCardImage = (images) => {
    if(images.length > 0) {
        return images[0].url;
    } else {
        return '/images/img_not_available.jpg';
    }
};

const ProductCard = (props) => {
    console.log(props);
    return (
        <div className='product-card-container'>
            <div className="product-image">
                <img src={ genCardImage(props.images) } alt=""/>
            </div>
            <div className="product-card-content">
                <h2>{ props.manufacturer.name }</h2>
                <h4>{ props.name }</h4>
                <h2>{ `${props.price} zł` }</h2>
            </div>
            <div className="product-card-buttons">
                <button>
                    Zobacz produkt
                </button>
                <button>
                    Kup
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
