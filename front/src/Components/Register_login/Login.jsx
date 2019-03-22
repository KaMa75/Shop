import React, {Component} from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Button from '../Button.jsx';
import Input from './Input.jsx';

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
            }
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
            [name]: inputData
        });
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
                            <Button
                                linkTo='#'
                            >
                                Zaloguj
                            </Button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

};

export default Login;
