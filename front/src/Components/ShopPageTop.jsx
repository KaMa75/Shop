import React from 'react';

const ShopPageTop = (props) => {
    return (
        <div className='shop-page-top'>
            <h2>
                { props.children }
            </h2>
        </div>
    );
};

export default ShopPageTop;
