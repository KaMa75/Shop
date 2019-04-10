import React, { Component } from 'react';

class ProductImages extends Component {

    genProductImages() {
        if(this.props.images.length > 0) {
            console.log('galeria produktu');
        } else {
            return '/images/img_not_available.jpg';
        }
    };

    render() {
        if(!this.props.images) {
            return null;
        }
        return (
            <div>
                <img src={ this.genProductImages() } alt=""/>
            </div>
        );
    }
}

export default ProductImages;
