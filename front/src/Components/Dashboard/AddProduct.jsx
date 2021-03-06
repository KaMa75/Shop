import React, { Component } from 'react';
import LayoutDashboard from '../LayoutDashboard.jsx';
import Input from '../Input.jsx';
import TextArea from '../TextArea.jsx';
import Select from '../Select.jsx';
import axios from 'axios';

const urlManufacturers = '/api/product/manufacturers';
const urlMaterials = '/api/product/materials';
const urlDestinys = '/api/product/destinys';
const urlTypes = '/api/product/types';

const urlAddProduct = '/api/product/article';

class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: {
                type: 'text',
                placeholder: 'Nazwa produktu',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            model: {
                type: 'text',
                placeholder: 'Model',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            description: {
                placeholder: 'Opis produktu',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            price: {
                type: 'number',
                placeholder: 'Cena',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            manufacturer: {
                options: [],
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            material: {
                options: [],
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            type: {
                options: [],
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            destiny: {
                options: [],
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            color: {
                type: 'text',
                placeholder: 'Kolor',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            size: {
                type: 'number',
                placeholder: 'Rozmiar',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            available: {
                options: [
                    {key: true, value: 'Dostępne'},
                    {key: false, value: 'Niedostępne'}
                ],
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            publish: {
                options: [
                    {key: true, value: 'Pokaż'},
                    {key: false, value: 'Ukryj'}
                ],
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            formError: false,
            errorMsg: '',
            formSuccess: false,
            successMsg: ''
        }
    }

    setOptionsKeyAndValue(array) {
        return array.map( (item) => {
            return {
                key: item._id,
                value: item.name
            }
        });
    }

    setCategoriesOptions() {
        const categories = { ...this.props.categoriesData };
        const manufacturer = this.state.manufacturer;
        const material = this.state.material;
        const type = this.state.type;
        const destiny = this.state.destiny;
        manufacturer.options = this.setOptionsKeyAndValue(categories.manufacturers);
        material.options = this.setOptionsKeyAndValue(categories.materials);
        type.options = this.setOptionsKeyAndValue(categories.types);
        destiny.options = this.setOptionsKeyAndValue(categories.destinys);
        this.setState({
            manufacturer,
            material,
            type,
            destiny
        });
    }
    
    inputValue = (name, value) => {
        const inputData = {
            ...value
        }
        inputData.errorMessage = '';
        inputData.formError = false;
        inputData.errorMsg = '';
        inputData.formSuccess = false;
        inputData.successMsg = '';
        this.setState({
            [name]: inputData,
            errorMsg: '',
            successMsg: ''
        });
    }
    
    inputValid = (name, value) => {
        const inputData = {
            ...value
        }
        if(inputData.required) {
            const valid = inputData.value.trim() !== '';
            inputData.errorMessage = valid ? '' : 'To pole jest wymagane';
            inputData.valid = valid ? true : false;
        }
        this.setState({
            [name]: inputData,
            formError: false
        });
    }

    getDataToSubmit() {
        return {
            name: this.state.name.value,
            model: this.state.model.value,
            description: this.state.description.value,
            price: this.state.price.value,
            manufacturer: this.state.manufacturer.value,
            material: this.state.material.value,
            type: this.state.type.value,
            destiny: this.state.destiny.value,
            color: this.state.color.value,
            size: this.state.size.value,
            available: this.state.available.value,
            publish: this.state.publish.value
        }
    }

    resetForm() {
        const stateData = this.state;
        for(let key in stateData) {
            if(stateData[key].value) {
                const data = { ...stateData[key] };
                data.value = '';
                data.valid = false;
                this.setState({
                    [key]: data
                });
            }
        }
    }
    
    addProduct = () => {
        const dataToSubmit = this.getDataToSubmit();
        let formError = this.state.formError;
        for(let key in dataToSubmit) {
            if (!this.state[key].valid) {
                formError = true;
                this.setState({
                    formError: formError,
                    errorMsg: 'Nieprawidłowe dane.'
                });
            }
        }
        if(!formError) {
            axios.post(urlAddProduct, dataToSubmit)
            .then(response => {
                if(response.status === 200) {
                    return response.data;
                } else {
                    throw new Error('Błąd połączenia');
                }
            })
            .then(response => {
                if(response.success) {
                    this.setState({
                        formSuccess: response.success,
                        successMsg: 'Produkt dodany'
                    });
                    this.resetForm();
                } else {
                    this.setState({
                        formError: !response.success,
                        errorMsg: 'Wystąpił błąd. Nie udało się dodać produktu'
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    
    componentDidMount() {
        this.setCategoriesOptions();
    }

    renderForm() {
        return (
            <form className='add-product-form'>
                <Input
                    id='name'
                    inputData={ this.state.name }
                    onChange={ this.inputValue }
                    onBlur={ this.inputValid }
                />
                <Input
                    id='model'
                    inputData={ this.state.model }
                    onChange={ this.inputValue }
                    onBlur={ this.inputValid }
                />
                <TextArea
                    id='description'
                    inputData={ this.state.description }
                    onChange={ this.inputValue }
                    onBlur={ this.inputValid }
                />
                <Input
                    id='price'
                    inputData={ this.state.price }
                    onChange={ this.inputValue }
                    onBlur={ this.inputValid }
                />
                <Select
                    title='Wybierz producenta'
                    id='manufacturer'
                    selectData={ this.state.manufacturer }
                    onChange={ this.inputValue }
                    onBlur={ this.inputValid }
                />
                <Select
                    title='Wybierz materiał'
                    id='material'
                    selectData={ this.state.material }
                    onChange={ this.inputValue }
                    onBlur={ this.inputValid }
                />
                <Select
                    title='Wybierz typ'
                    id='type'
                    selectData={ this.state.type }
                    onChange={ this.inputValue }
                    onBlur={ this.inputValid }
                />
                <Select
                    title='Wybierz przeznaczenie'
                    id='destiny'
                    selectData={ this.state.destiny }
                    onChange={ this.inputValue }
                    onBlur={ this.inputValid }
                />
                <Input
                    id='color'
                    inputData={ this.state.color }
                    onChange={ this.inputValue }
                    onBlur={ this.inputValid }
                />
                <Input
                    id='size'
                    inputData={ this.state.size }
                    onChange={ this.inputValue }
                    onBlur={ this.inputValid }
                />
                <Select
                    title='Wybierz dostępność'
                    id='available'
                    selectData={ this.state.available }
                    onChange={ this.inputValue }
                    onBlur={ this.inputValid }
                />
                <Select
                    title='Wybierz widoczność'
                    id='publish'
                    selectData={ this.state.publish }
                    onChange={ this.inputValue }
                    onBlur={ this.inputValid }
                />
                { this.state.formSuccess && (
                    <div className="success-msg">
                        <p>{ this.state.successMsg }</p>
                    </div>
                )}
                { this.state.formError && (
                    <div className="error-msg">
                        <p>{ this.state.errorMsg }</p>
                    </div>
                )}
                <button
                    onClick={ this.addProduct }
                >
                    Dodaj produkt
                </button>
            </form>
        );
    }

    render() {
        return (
            <LayoutDashboard
                isAdmin={ this.props.userData.isAdmin }
            >
                <div className="user-nfo-panel-wrapper">
                    <h3>Dodaj produkt</h3>
                    <div className="user-nfo-panel">
                        { this.props.categoriesData.isLoaded ? this.renderForm() : null }
                    </div>
                </div>
            </LayoutDashboard>
        );
    }
}

export default AddProduct;
