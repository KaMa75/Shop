import React from 'react';
import CheckBox from './CheckBox.jsx';
import RadioBox from './RadioBox.jsx';

const FiltersSection = (props) => {
    const {handleFilters, manufacturers, materials, destinys, types, price} = props;
    return (
        <div className="shop-filters">
            { (manufacturers.length > 0) && (
                <CheckBox
                    open={ true }
                    title='Producent'
                    list={ manufacturers }
                    handleFilters={ (filters) => handleFilters(filters, 'manufacturers') }
                />
            ) }
            { (materials.length > 0) && (
                <CheckBox
                    open={ false }
                    title='Materiał'
                    list={ materials }
                    handleFilters={ (filters) => handleFilters(filters, 'materials') }
                />
            ) }
            { (destinys.length > 0) && (
                <CheckBox
                    open={ false }
                    title='Przeznaczenie'
                    list={ destinys }
                    handleFilters={ (filters) => handleFilters(filters, 'destinys') }
                />
            ) }
            { (types.length > 0) && (
                <CheckBox
                    open={ false }
                    title='Typ'
                    list={ types }
                    handleFilters={ (filters) => handleFilters(filters, 'types') }
                />
            ) }
            { (price.length > 0) && (
                <RadioBox
                    open={ true }
                    title='Cena'
                    list={ price }
                    handleFilters={ (filters) => handleFilters(filters, 'price') }
                />
            ) }
        </div>
    );
};

export default FiltersSection;
