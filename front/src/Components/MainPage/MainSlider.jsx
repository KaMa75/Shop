import React, { Component } from 'react';
import Slider from 'react-slick';
import Button from '../Button.jsx';
import { slides } from '../../configData/mainSlider';

const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
}

class MainSlider extends Component {

    genSlides(data) {
        if(data) {
            return data.map((item, i) => (
                <div key={ i } className="slide">
                    <div className="slide-img"
                        style={{
                            background: `url(${item.img})`
                        }}
                    >
                        <div className="container">
                            <div className="slide-content">
                                <h2>{ item.header }</h2>
                                <p>{ item.content }</p>
                                <Button
                                    linkTo={ item.linkTo }
                                >
                                    { item.btnText }
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ));
        }
        return null;
    }

    render() {
        return (
            <div>
                <Slider
                    {...sliderSettings}
                >
                    { this.genSlides(slides) }
                </Slider>
            </div>

        );
    }

}

export default MainSlider;
