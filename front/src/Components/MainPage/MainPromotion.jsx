import React, { Component } from 'react';
import Button from '../Button.jsx';
import { promotion } from '../../configData/mainPromotion';

class MainPromotion extends Component {
    render() {
        if(promotion) {
            return (
                <div className="home-promotion">
                    <div className="promotion-img"
                        style={{
                            background: `url(${promotion.img})`
                        }}
                    >
                        <div className="container">
                            <div className="promotion-content">
                                <h1>{ promotion.header }</h1>
                                <p>{ promotion.content }</p>
                                <Button
                                    linkTo={ promotion.linkTo }
                                >
                                    { promotion.btnText }
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default MainPromotion;
