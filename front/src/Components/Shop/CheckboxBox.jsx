import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import { List, ListItem, ListItemText } from '@material-ui/core';

class CheckboxBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.collapsed
        }
    }

    handleOnClick = () => {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        return (
            <div className='checkbox-wrapper'>
            <List
                className='checkbox-list'
            >
                <ListItem
                    className='checkbox-list-header'
                    onClick={ this.handleOnClick }
                >
                    <ListItemText
                        className='checkbox-list-title'
                        primary={ this.props.title }
                    />
                    <FontAwesomeIcon
                        icon={ this.state.open ? faAngleUp : faAngleDown }
                    />
                </ListItem>
            </List>
                filter
            </div>
        );
    }
}

export default CheckboxBox;
