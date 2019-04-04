import React from 'react';
import ProductCard from '../ProductCard.jsx';

const genBlock = (arr) => {
    return arr.map((item, i) => {
        return (
            <ProductCard
                key={ i }
                { ...item }
            />
        );
    });
}

const ProductsBlock = (props) => {
    if(props.products.length > 0) {
        return (
            <section className='products-block'>
                <div className='container'>
                    <h2>
                        { props.title }
                    </h2>
                    <div className='products-cards'>
                        { genBlock(props.products) }
                    </div>
                </div>
            </section>
        );
    }
    return null;
};

export default ProductsBlock;
