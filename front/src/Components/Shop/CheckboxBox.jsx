import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';

class CheckboxBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.collapsed
        }
    }
    render() {
        return (
            <div>
                filter
            </div>
        );
    }
}

export default CheckboxBox;
