import React, { Component } from 'react';
import Input from '../Input.jsx';

const url = '/api/product/';

class ManageCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: {
                type: 'text',
                placeholder: 'Producent',
                value: '',
                required: true,
                valid: false,
                errorMessage: ''
            },
            formError: false,
            errorMsg: '',
            formSuccess: false,
            successMsg: ''
        }
    }

    genCategoryList() {
        return this.props.list.map( item => (
            <li key={ item._id }>
                { item.name }
            </li>
        ));
    }

    render() {
        console.log(this.props.title)
        console.log(this.props.list)
        return (
            <div className='manage-category-wrapper'>
                <h4>{ this.props.title }</h4>
                <div className="category-list">
                    <ul>
                        { this.genCategoryList() }
                    </ul>
                </div>
                <form className='add-to-category'>
                    <Input
                        id={ this.props.id }
                        inputData={ this.state.name }
                        onChange={ this.inputValue }
                        onBlur={ this.inputValid }
                    />
                    <button
                        onClick={ this.addToCategory }
                    >
                        Dodaj
                    </button>
                </form>
            </div>
        );
    }
}

export default ManageCategory;
