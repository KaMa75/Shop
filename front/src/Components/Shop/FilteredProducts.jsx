import React from 'react';
import ProductCard from '../ProductCard.jsx';

const genProductsList = (list) => {
    return list.map((item) => {
        return (
            <ProductCard
                key={ item._id }
                { ...item }
            />
        );
    });
}

const renderProductsCard = (list, loadMore) => {
    let element = null;
    if(list) {
        if(list.length > 0) {
            element = (
                <div className="products-card">
                    <section className="products-cards clear-fix">
                        { genProductsList(list) }
                    </section>
                    <button
                        onClick={ loadMore }
                    >
                        Pokaż więcej
                    </button>
                </div>
            );
        } else {
            element = (
                <div className="no-result">
                    <p>Brak produktów spełniających podane kryteria wyszukiwania.</p>
                </div>
            );
        }
    }
    return element;
};

const FilteredProducts = (props) => {
    return (
        <div>
            { renderProductsCard(props.products, props.loadMore) }
        </div>
    );
};

export default FilteredProducts;
