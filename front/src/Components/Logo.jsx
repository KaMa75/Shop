import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="logo">
            <Link to="/" replace>
                <img src="images/logo.png" alt=""/>
                {/* <img src="../../../images/logo.png" alt=""/> */}
                {/* <img src="../../images/logo.png" alt=""/> */}
            </Link>
        </div>
    );
}

export default Logo;
