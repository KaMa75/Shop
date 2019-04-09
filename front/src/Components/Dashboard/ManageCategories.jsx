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
        console.log(this.state)
        return (
            <LayoutDashboard
                isAdmin={ this.props.userData.isAdmin }
            >
                <div className="user-nfo-panel-wrapper">                    
                    <h3>Zarządzaj kategoriami</h3>
                    <div className="user-nfo-panel">
                        <ManageCategory
                            title='Producent'
                            id='manufacturer'
                            list={ this.state.manufacturers }
                        />
                        <ManageCategory
                            title='Materiał'
                            id='material'
                            list={ this.state.materials }
                        />
                        <ManageCategory
                            title='Przeznaczenie'
                            id='destiny'
                            list={ this.state.destinys }
                        />
                        <ManageCategory
                            title='Typ'
                            id='type'
                            list={ this.state.types }
                        />
                    </div>
                </div>
            </LayoutDashboard>
        );
    }

}

export default ManageCategories;
