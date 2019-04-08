import React, { Component } from 'react';

class Input extends Component {

    inputValue = (event) => {
        if(typeof this.props.onChange === 'function') {
            const inputData = {
                ...this.props.inputData
            };
            inputData.value = event.target.value;
            this.props.onChange(this.props.id, inputData);
        }
    }

    inputValid = () => {
        if(typeof this.props.onBlur === 'function') {
            this.props.onBlur(this.props.id, this.props.inputData);
        }
    }

    showError(show, txt) {
        return !show && txt;
    }

    render() {
        const {type, placeholder, value, valid, errorMessage } = this.props.inputData;
        return (
            <div className="input">
                <input
                    type={ type }
                    placeholder={ placeholder }
                    value={ value }
                    onChange={ this.inputValue }
                    onBlur={ this.inputValid }
                />
                <p className="error-msg">
                    { this.showError(valid, errorMessage) }
                </p>
            </div>
        );
    }
}

export default Input;
