import React, { Component } from 'react';

class ProductDetail extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
    }
    render() {
        return (
            <div>
                Product detail
            </div>
        );
    }
}

export default ProductDetail;
