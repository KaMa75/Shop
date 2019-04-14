import React, { Component } from 'react';
import ProductCard from '../ProductCard.jsx';
import Loading from '../Loading.jsx';

class FilteredProducts extends Component {

    genProductsList(list) {
        return list.map((item) => {
            return (
                <ProductCard
                    key={ item._id }
                    addToBasket={ this.props.addToBasket }
                    { ...item }
                />
            );
        });
    }

    renderProductsCard() {
        return (
            <div className="products-card">
                <section className="products-cards clear-fix">
                    { this.genProductsList(this.props.products) }
                </section>
                {
                    this.props.showLoadMoreBtn ? (
                        <button
                            onClick={ this.props.loadMore }
                        >
                            Pokaż więcej
                        </button>
                    ) : null
                }
            </div>
        );
    };

    showIfNoProducts() {
        return this.props.isLoaded ? (
            <div className="no-result">
                <p>Brak produktów spełniających podane kryteria wyszukiwania.</p>
            </div>
        ) : (
            <Loading />
        );
    }

    render() {
        return (
            (this.props.products.length > 0) ? (
                <div>
                    { this.renderProductsCard() }
                </div>
            ) : this.showIfNoProducts()
        );
    }
}

export default FilteredProducts;
