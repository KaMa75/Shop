import React, { Component } from 'react';
import LayoutDashboard from '../LayoutDashboard.jsx';
import ManageCategory from './ManageCategory.jsx';
import axios from 'axios';

const urlManufacturers = '/api/product/manufacturers';
const urlMaterials = '/api/product/materials';
const urlDestinys = '/api/product/destinys';
const urlTypes = '/api/product/types';

class ManageCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            manufacturers: [],
            materials: [],
            destinys: [],
            types: []
        }
    }

    addToCategoryList = (value, name) => {
        const categoryList = [
            ...this.state[name],
            value
        ];
        this.setState({
            [name]: categoryList
        });
    }

    getData(url, stateName) {
        axios.get(url)
            .then(response => {
                if(response.status === 200) {
                    return response.data;
                } else {
                    throw new Error('Błąd połączenia');
                }
            })
            .then(response => {
                this.setState({
                    [stateName]: response
                });
            })
            .catch(error => {
                console.log(error);
        });
    }

    getCategories() {
        this.getData(urlManufacturers, 'manufacturers');
        this.getData(urlMaterials, 'materials');
        this.getData(urlDestinys, 'destinys');
        this.getData(urlTypes, 'types');
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        return (
            <LayoutDashboard
                isAdmin={ this.props.userData.isAdmin }
            >
                <div className="user-nfo-panel-wrapper">                    
                    <h3>Zarządzaj kategoriami</h3>
                    <div className="user-nfo-panel">
                        <ManageCategory
                            title='Producent'
                            category='manufacturer'
                            list={ this.state.manufacturers }
                            addToCategoryList={ (value) => this.addToCategoryList(value, 'manufacturers') }
                        />
                        <ManageCategory
                            title='Materiał'
                            category='material'
                            list={ this.state.materials }
                            addToCategoryList={ (value) => this.addToCategoryList(value, 'materials') }
                        />
                        <ManageCategory
                            title='Przeznaczenie'
                            category='destiny'
                            list={ this.state.destinys }
                            addToCategoryList={ (value) => this.addToCategoryList(value, 'destinys') }
                        />
                        <ManageCategory
                            title='Typ'
                            category='type'
                            list={ this.state.types }
                            addToCategoryList={ (value) => this.addToCategoryList(value, 'types') }
                        />
                    </div>
                </div>
            </LayoutDashboard>
        );
    }

}

export default ManageCategories;
