import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {
    return (
        <Link
            to={ props.linkTo }
            className='button'
        >
            <button>
                { props.children }
            </button>
        </Link>
    );
};

export default Button;
