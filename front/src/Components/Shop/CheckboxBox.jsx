import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import { List, ListItem, ListItemText, Collapse, ListItemSecondaryAction, Checkbox } from '@material-ui/core';

class CheckboxBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            checked: []
        }
    }

    handleOnClick = () => {
        this.setState({
            open: !this.state.open
        });
    }

    handleOnChange = value => () => {
        let checkedBoxes = this.state.checked;
        const index = checkedBoxes.indexOf(value);
        if(index >= 0) {
            checkedBoxes.splice(index, 1);
        } else {
            checkedBoxes = [...checkedBoxes, value];
        }
        this.setState({
            checked: checkedBoxes
        }, () => {
            this.props.handleFilters(checkedBoxes);
        });
    }

    genList() {
        return this.props.list.map((item) => {
            return (
                <ListItem
                    className='filter-list-item'
                    key={ item._id }
                >
                    <ListItemText
                        primary={ item.name }
                    />
                    <ListItemSecondaryAction>
                        <Checkbox
                            color='default'
                            className='filter-list-checkbox'
                            onChange={ this.handleOnChange(item._id) }
                            checked={ this.state.checked.indexOf(item._id) >=0 }
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            );
        });
    }

    render() {
        console.log(this.state.checked);
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
                    <Collapse
                        in={ this.state.open }
                        timeout='auto'
                        unmountOnExit
                    >
                        <List
                            component='div'
                        >
                            { this.genList() }
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

export default CheckboxBox;
