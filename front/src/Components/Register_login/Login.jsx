import React, {Component} from 'react';
import axios from 'axios';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Button from '../Button.jsx';
import Input from './Input.jsx';

const urlLogin = '/api/users/login';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
                placeholder: 'Podaj hasło',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            formError: false,
            errorMsg: ''
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
        this.setState({
            [name]: inputData,
            formError: false
        });
    }

    submitData = (event) => {
        let formError = this.state.formError;
        const dataToSubmit = {
            email: this.state.email.value,
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
                const loginSuccess = response.loginSuccess;
                if(loginSuccess) {
                    this.props.setUserState(response.loginSuccess);
                } else {
                    this.setState({
                        formError: !loginSuccess,
                        errorMsg: response.message
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
                <Header />
                <div className="container">
                    <div className="register-login-container">
                        <div className="register-container">
                            <h2>Nie masz konta?</h2>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit provident consequatur distinctio fugiat odio. Harum reprehenderit et, dicta quaerat pariatur corrupti ipsa itaque. Enim cum minus consectetur reprehenderit pariatur quia?</p>
                            <Button
                                linkTo='/register'
                            >
                                Zarejestruj
                            </Button>
                        </div>
                        <div className="login-container">
                            <h2>Logowanie</h2>
                            <Input
                                id='email'
                                inputData={ this.state.email }
                                onChange={ this.inputValue }
                                onBlur={ this.inputValid }
                            />
                            <Input
                                id='password'
                                inputData={ this.state.password }
                                onChange={ this.inputValue }
                                onBlur={ this.inputValid }
                            />
                            { this.state.formError && (
                                <div className="error-msg">
                                    { this.state.errorMsg }
                                </div>
                            )}
                            <button
                                onClick={ this.submitData }
                            >
                                Zaloguj
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

};

export default Login;
