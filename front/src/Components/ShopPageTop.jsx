import React from 'react';

const ShopPageTop = (props) => {
    return (
        <div className='shop-page-top'>
            <div className="container">
                <h2>
                    { props.children }
                </h2>
            </div>
        </div>
    );
};

export default ShopPageTop;
