import React, { useState } from 'react';
import './Header.css';
import trevoImage from '../../assets/trevo.png';

function Header(props) {
    return (
        <div className='header'>
            <img
                src={trevoImage}
                alt='trevo'
                className={props.isSpinning ? 'header-image spinning' : 'header-image'}
            />
            <p>MegaDell da Virada</p>
        </div>
    );
}

export default Header;
