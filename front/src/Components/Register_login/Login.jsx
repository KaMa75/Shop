import React from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Button from '../Button.jsx';

const Login = () => {
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
                            type='text'
                            placeholder='Podaj e-mail'
                            value=''
                        />
                        <input
                            type='password'
                            placeholder='Podaj hasło'
                            value=''
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
};

export default Login;
