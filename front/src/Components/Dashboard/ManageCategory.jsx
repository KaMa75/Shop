import React, { Component } from 'react';
import Input from '../Input.jsx';
import axios from 'axios';

const url = '/api/product';

class ManageCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: {
                type: 'text',
                placeholder: 'Producent',
                value: '',
                required: false,
                valid: false,
                errorMessage: ''
            },
            formError: false,
            errorMsg: '',
            formSuccess: false,
            successMsg: ''
        }
    }

    inputValue = (name, value) => {
        const inputData = {
            ...value
        }
        this.setState({
            name: inputData,
            formError: false,
            errorMsg: ''
        });
    }

    resetMsgs = () => {
        const timer = setTimeout(() => {
            clearTimeout(timer);
            this.setState({
                formError: false,
                errorMsg: '',
                formSuccess: false,
                successMsg: ''
            });
        }, 3000);
    }

    inputValid() {
        let formError = this.state.formError;
        let errorMsg = this.state.errorMsg;
        const newName = this.state.name.value;
        if(newName.trim() === '') {
            errorMsg = 'Wpisz nazwę, nie można dodać pustego pola.';
            formError = true;
        }
        if(!formError) {
            this.props.list.forEach((item) => {
                if(item.name.toLowerCase() === newName.toLowerCase()) {
                    errorMsg = 'Podana nazwa już istnieje.';
                    formError = true;
                }
            });
        }
        this.setState({
            formError,
            errorMsg
        }, () => {
            this.resetMsgs();
        });
        return !formError;
    }

    resetForm() {
        const data = this.state.name;
        data.value = '';
        this.setState({
            name: data
        });
    }

    addToCategory = () => {
        const formPass = this.inputValid();
        const dataToSubmit = {
            name: this.state.name.value
        };
        if(formPass) {
            axios.post(`${url}/${this.props.category}`, dataToSubmit)
            .then(response => {
                if(response.status === 200) {
                    return response.data;
                } else {
                    throw new Error('Błąd połączenia');
                }
            })
            .then(response => {
                if(response.success) {
                    this.props.addToCategoryList(response[this.props.category]);
                    this.setState({
                        formSuccess: response.success,
                        successMsg: `Dodano nową nazwę w kategorii`
                    }, () => {
                        this.resetMsgs();
                    });
                } else {
                    this.setState({
                        formError: !response.success,
                        errorMsg: 'Wystąpił błąd. Nie udało się dodać produktu'
                    }, () => {
                        this.resetMsgs()
                    });
                }
                this.resetForm();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    genCategoryList() {
        return this.props.list.map( item => (
            <li key={ item._id }>
                { item.name }
            </li>
        ));
    }

    render() {
        return (
            <div className='manage-category-wrapper'>
                <h4>{ this.props.title }</h4>
                <div className="category-list">
                    <ul>
                        { this.genCategoryList() }
                    </ul>
                </div>
                <form className='add-to-category'>
                    <Input
                        id={ this.props.category }
                        inputData={ this.state.name }
                        onChange={ this.inputValue }
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
                        onClick={ this.addToCategory }
                    >
                        Dodaj
                    </button>
                </form>
            </div>
        );
    }
}

export default ManageCategory;
