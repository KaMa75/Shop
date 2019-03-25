import React from 'react';
import Button from '../Button.jsx';

const RegisterPopup = (props) => {
    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-wrapper">
                    <div>
                        <h2>Gratulacje</h2>
                        <p>Teraz możesz się zalogować</p>
                    </div>
                    <Button
                        linkTo='/login'
                    >
                        Przejdź do logowania
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPopup;
