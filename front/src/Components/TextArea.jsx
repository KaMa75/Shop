import React, { Component } from 'react';

class TextArea extends Component {

    inputValue = (event) => {
        if(typeof this.props.onChange === 'function') {
            const inputData = {
                ...this.props.inputData
            };
            inputData.value = event.target.value;
            inputData.errorMessage = '';
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
        const {placeholder, value, valid, errorMessage } = this.props.inputData;
        return (
            <div className="input">
                <textarea
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

export default TextArea;
