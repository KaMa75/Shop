import React, {Component} from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Button from '../Button.jsx';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailInput: '',
            emailValid: false,
            passwordInput: '',
            passwordValid: false
        }
    }

    changeInputValue = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        });
    }

    validInputValue = (name, value) => () => {
        if(value !== '') {
            this.setState({
                [name]: true
            });
        } else {
            console.log('no')

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
                            <input
                                type='email'
                                placeholder='Podaj e-mail'
                                value={ this.state.emailInput }
                                onChange={ this.changeInputValue('emailInput') }
                                onBlur={ this.validInputValue('emailValid', this.state.emailInput) }
                            />
                            <input
                                type='password'
                                placeholder='Podaj hasło'
                                value={ this.state.passwordInput }
                                onChange={ this.changeInputValue('passwordInput') }
                                onBlur={ this.validInputValue('passwordValid', this.state.passwordInput) }
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
