import React, { Component } from 'react';
import MainSlider from './MainSlider.jsx';
import MainPromotion from './MainPromotion.jsx';

class MainPage extends Component {
    render() {
        return (
            <div className='main-page'>
                <MainSlider />
                <div className='container'>
                    MainPage
                </div>
                <MainPromotion />
            </div>
        );
    }
}

export default MainPage;
