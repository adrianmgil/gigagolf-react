import React from 'react';
import GGLogo from './GGLogo';
import HeaderAccount from './HeaderAccount';
import './header.less';

const Header = () => {

    return (
        <div className="header-wrapper">
            <GGLogo showText={true} />
                <div className="header-topmenu">
                    <label>SHOP</label>
                    <label>CLUBS</label>
                    <label>ACCESSORIES</label>
                    <label>ABOUT</label>
                    <label>CONTACT</label>
                </div>
            <HeaderAccount />
        </div>
    );
};

export default Header;