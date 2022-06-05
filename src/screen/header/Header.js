import React from 'react';
import GGLogo from './GGLogo';
import HeaderAccount from './HeaderAccount';
import './header.less';

const Header = () => {

    return (
        <div className="header-wrapper">
            <GGLogo showText={true} />
            <table>
                <tr>
                    <td><label>SHOP</label></td>
                    <td><label>CLUBS</label></td>
                    <td><label>ACCESSORIES</label></td>
                    <td><label>ABOUT</label></td>
                    <td><label>CONTACT</label></td>
                </tr>
            </table>
            <HeaderAccount />
        </div>
    );
};

export default Header;