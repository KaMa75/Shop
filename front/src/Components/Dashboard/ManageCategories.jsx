import React, { Component } from 'react';
import LayoutDashboard from '../LayoutDashboard.jsx';
import ManageCategory from './ManageCategory.jsx';

class ManageCategories extends Component {

    render() {
        const categories = { ...this.props.categoriesData };
        return (
            <LayoutDashboard
                isAdmin={ this.props.userData.isAdmin }
            >
                <div className="user-nfo-panel-wrapper">                    
                    <h3>Zarządzaj kategoriami</h3>
                    { categories.isLoaded ? (
                        <div className="user-nfo-panel">
                            <ManageCategory
                                title='Producent'
                                category='manufacturer'
                                list={ categories.manufacturers }
                                addToCategoryList={ (value) => this.props.addToCategoryList(value, 'manufacturers') }
                            />
                            <ManageCategory
                                title='Materiał'
                                category='material'
                                list={ categories.materials }
                                addToCategoryList={ (value) => this.props.addToCategoryList(value, 'materials') }
                            />
                            <ManageCategory
                                title='Przeznaczenie'
                                category='destiny'
                                list={ categories.destinys }
                                addToCategoryList={ (value) => this.props.addToCategoryList(value, 'destinys') }
                            />
                            <ManageCategory
                                title='Typ'
                                category='type'
                                list={ categories.types }
                                addToCategoryList={ (value) => this.props.addToCategoryList(value, 'types') }
                            />
                        </div>
                    ) : null }
                </div>
            </LayoutDashboard>
        );
    }

}

export default ManageCategories;
