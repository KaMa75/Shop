import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import { List, ListItem, ListItemText, Collapse, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';

class RadioBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            value: '0'
        }
    }

    handleOnClick = () => {
        this.setState({
            open: !this.state.open
        });
    }
    handleOnChange = (event) => {
        this.setState({
            value: event.target.value
        }, () => {
            this.props.handleFilters(this.state.value);
        });
    }

    genList() {
        return this.props.list.map((item) => {
            return (
                <FormControlLabel
                    className='filter-list-item'
                    label={ item.name }
                    value={ `${item._id}` }
                    control={ <Radio color='default' /> }
                    key={ item._id }
                />
            );
        });
    }

    render() {
        return (
            <div className='radiobox-wrapper'>
                <List
                    className='radiobox-list'
                >
                    <ListItem
                        className='radiobox-list-header'
                        onClick={ this.handleOnClick }
                    >
                        <ListItemText
                            className='radiobox-list-title'
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
                        <RadioGroup
                            name='prices'
                            value={ this.state.value }
                            onChange={ this.handleOnChange }
                        >
                            { this.genList() }
                        </RadioGroup>
                    </Collapse>
                </List>
            </div>
        );
    }

}

export default RadioBox;
