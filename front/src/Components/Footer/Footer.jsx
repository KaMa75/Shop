import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <h3>Informacje kontaktowe</h3>
                <hr />
                <div className="wrapper">
                    <div className="inside-wrapper">
                        <div className="contact-info">
                            <FontAwesomeIcon
                                icon={ faCompass }
                                className="icon"
                            />
                            <div>
                                <h4>Nasz adres:</h4>
                                <p>35-100 Kraków</p>
                                <p>ul. Zamkowa 1</p>
                            </div>
                        </div>
                        <div className="contact-info">
                            <FontAwesomeIcon
                                icon={ faClock }
                                className="icon"
                            />
                            <div>
                                <h4>Otwarte:</h4>
                                <p>Pon-Sob/ 8:00-20:00</p>
                            </div>
                        </div>
                    </div>
                    <div className="inside-wrapper">
                    <div className="contact-info">
                            <FontAwesomeIcon
                                icon={ faPhone }
                                className="icon"
                            />
                            <div>
                                <h4>Telefon:</h4>
                                <p>+48 000 000 000</p>
                            </div>
                        </div>
                        <div className="contact-info">
                            <FontAwesomeIcon
                                icon={ faEnvelope }
                                className="icon"
                            />
                            <div>
                                <h4>E-mail:</h4>
                                <p>
                                    <a href="mailto:contact@shoes-shop.nfo">contact@shoes-shop.nfo</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <p className="copy">
                    Copyrigth &copy; 2019 - kursant CodersLab ;)
                </p>
            </div>
        </footer>
    );
}

export default Footer;
