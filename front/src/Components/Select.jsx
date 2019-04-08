import React, { Component } from 'react';

class Select extends Component {

    selectValue = (event) => {
        if(typeof this.props.onChange === 'function') {
            const selectData = {
                ...this.props.selectData
            };
            selectData.value = event.target.value;
            this.props.onChange(this.props.id, selectData);
        }
    }

    selectValid = () => {
        if(typeof this.props.onBlur === 'function') {
            this.props.onBlur(this.props.id, this.props.selectData);
        }
    }

    showError(show, txt) {
        return !show && txt;
    }

    genOptions() {
        return this.props.selectData.options.map(item => (
                <option
                    key={ item.key }
                    value={ item.key }
                >
                    { item.value }
                </option>
            )
        );
    }

    render() {
        const {value, valid, errorMessage } = this.props.selectData;
        return (
            <div className="select">
                <select
                    value={ value }
                    onChange={ this.selectValue }
                    onBlur={ this.selectValid }
                >
                    <option value=''>{ this.props.title }</option>
                    { this.genOptions() }
                </select>
                <p className="error-msg">
                    { this.showError(valid, errorMessage) }
                </p>
            </div>
        );
    }

}

export default Select;
