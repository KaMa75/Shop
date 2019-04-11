import React, { Component } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import axios from 'axios';
import Routes from './Routes.jsx';
import Loading from './Loading.jsx';
import Error from './Error.jsx';

const urlAuth = '/api/users/auth';
const urlManufacturers = '/api/product/manufacturers';
const urlMaterials = '/api/product/materials';
const urlDestinys = '/api/product/destinys';
const urlTypes = '/api/product/types';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: {
                manufacturers: [],
                materials: [],
                destinys: [],
                types: [],
                isLoaded: false
            },
            user: {
                isAuth: false,
                isAdmin: false
            },
            isLoaded: false,
            isError: false
        };
    }

    setAppState = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    userAuth() {
        axios.get(urlAuth)
        .then(response => {
            if(response.status === 200) {
                return response.data;
            } else {
                throw new Error('Błąd połączenia');
            }
        })
        .then(response => {
            this.setAppState('user', response);
            this.setAppState('isLoaded', true);
        })
        .catch(error => {
            this.setAppState('isError', true);
            console.log(error);
        });
    }

    getData(url) {
        return axios.get(url)
            .then(response => {
                if(response.status === 200) {
                    return response.data;
                } else {
                    throw new Error('Błąd połączenia');
                }
            })
            .catch(error => {
                console.log(error);
        });
    }

    getCategories() {
        let manufacturers = this.getData(urlManufacturers);
        let materials = this.getData(urlMaterials);
        let destinys = this.getData(urlDestinys);
        let types = this.getData(urlTypes);
        axios.all([manufacturers, materials, destinys, types])
        .then(axios.spread((manufacturers, materials, destinys, types) => {
            const newCategoriesData = {
                manufacturers,
                materials,
                destinys,
                types,
                isLoaded: true
            }
            this.setState({
                categories: newCategoriesData
            });
        }));
    }

    addToCategoryList = (value, name) => {
        const categories = this.state.categories;
        categories[name] = [...categories[name], value];
        this.setState({
            categories
        });
    }

    componentDidMount() {
        this.userAuth();
        this.getCategories();
    }

    render() {
        if(this.state.isLoaded) {
            return (
                <HashRouter>
                    <Routes
                        userData={ this.state.user }
                        categoriesData={ this.state.categories }
                        setAppState={ this.setAppState }
                        addToCategoryList={ this.addToCategoryList }
                    />
                </HashRouter>
            );
        }
        if(this.state.isError) {
            return <Error />;
        }
        return <Loading />
    }

}

export default App;
