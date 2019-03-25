import React, { Component } from 'react';
import axios from 'axios';
import Input from './Input.jsx';
import RegisterPopup from './RegisterPopup.jsx';

const urlLogin = '/api/users/register';
const minPassLength = 8;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                type: 'text',
                placeholder: 'Imię',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            lastName: {
                type: 'text',
                placeholder: 'Nazwisko',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            street: {
                type: 'text',
                placeholder: 'Ulica',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            houseNumber: {
                type: 'text',
                placeholder: 'Numer domu/mieszkania',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            postCode: {
                type: 'text',
                placeholder: 'Kod pocztowy',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            city: {
                type: 'text',
                placeholder: 'Miejscowość',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            phone: {
                type: 'text',
                placeholder: 'Telefon',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            email: {
                type: 'email',
                placeholder: 'Podaj e-mail',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            password: {
                type: 'password',
                placeholder: 'Hasło',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            confirmPassword: {
                type: 'password',
                placeholder: 'Powtórz hasło',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            role: {
                type: Number,
                default: 0
            },
            formError: false,
            errorMsg: '',
            showPopUp: false
        }
    }

    inputValue = (name, value) => {
        this.setState({
            [name]: value
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
        if(inputData.type === 'email' && inputData.valid) {
            const valid = /\S+@\S+\.\S+/.test(inputData.value);
            inputData.errorMessage = valid ? '' : 'Niepoprawny e-mail';
            inputData.valid = valid ? true : false;
        }
        if(name === 'password' && inputData.valid) {
            const passLength = this.state.password.value.length;
            const valid = passLength >= minPassLength;
            inputData.errorMessage = valid ? '' : 'Hasło musi mieć przynajmniej 8 znaków';
            inputData.valid = valid ? true : false;
        }
        if(name === 'confirmPassword' && inputData.valid) {
            const pass = this.state.password.value;
            const confPass = this.state.confirmPassword.value;
            const valid = pass === confPass;
            inputData.errorMessage = valid ? '' : 'Hasła nie są takie same';
            inputData.valid = valid ? true : false;
        }
        this.setState({
            [name]: inputData,
            formError: false
        });
    }

    submitData = (event) => {
        let formError = this.state.formError;
        const dataToSubmit = {
            name: this.state.name.value,
            lastName: this.state.lastName.value,
            email: this.state.email.value,
            phone: this.state.phone.value,
            street: this.state.street.value,
            houseNumber: this.state.houseNumber.value,
            postCode: this.state.postCode.value,
            city: this.state.city.value,
            password: this.state.password.value
        }
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
            axios.post(urlLogin, dataToSubmit)
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
                        showPopUp: true
                    });
                } else {
                    this.setState({
                        formError: !response.success,
                        errorMsg: 'Podany e-mail jest już zarejestrowany'
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="register-login-container">
                        <form className="register-form">
                            <h2>Nowy użytkownik</h2>
                            <div>
                                <Input
                                    id='name'
                                    inputData={ this.state.name }
                                    onChange={ this.inputValue }
                                    onBlur={ this.inputValid }
                                />
                                <Input
                                    id='lastName'
                                    inputData={ this.state.lastName }
                                    onChange={ this.inputValue }
                                    onBlur={ this.inputValid }
                                />
                            </div>
                            <div>
                                <Input
                                    id='email'
                                    inputData={ this.state.email }
                                    onChange={ this.inputValue }
                                    onBlur={ this.inputValid }
                                />
                                <Input
                                    id='phone'
                                    inputData={ this.state.phone }
                                    onChange={ this.inputValue }
                                    onBlur={ this.inputValid }
                                />
                            </div>
                            <div>
                                <Input
                                    id='street'
                                    inputData={ this.state.street }
                                    onChange={ this.inputValue }
                                    onBlur={ this.inputValid }
                                />
                                <Input
                                    id='houseNumber'
                                    inputData={ this.state.houseNumber }
                                    onChange={ this.inputValue }
                                    onBlur={ this.inputValid }
                                />
                            </div>
                            <div>
                                <Input
                                    id='postCode'
                                    inputData={ this.state.postCode }
                                    onChange={ this.inputValue }
                                    onBlur={ this.inputValid }
                                />
                                <Input
                                    id='city'
                                    inputData={ this.state.city }
                                    onChange={ this.inputValue }
                                    onBlur={ this.inputValid }
                                />
                            </div>
                            <div>
                                <Input
                                    id='password'
                                    inputData={ this.state.password }
                                    onChange={ this.inputValue }
                                    onBlur={ this.inputValid }
                                />
                                <Input
                                    id='confirmPassword'
                                    inputData={ this.state.confirmPassword }
                                    onChange={ this.inputValue }
                                    onBlur={ this.inputValid }
                                />
                            </div>
                            { this.state.formError && (
                                <div className="error-msg">
                                    <p>{ this.state.errorMsg }</p>
                                </div>
                            )}
                            <button
                                onClick={ this.submitData }
                            >
                                Wyślij dane
                            </button>
                        </form>
                    </div>
                </div>
                { this.state.showPopUp && <RegisterPopup /> }
            </div>
        );
    }
};

export default Register;
