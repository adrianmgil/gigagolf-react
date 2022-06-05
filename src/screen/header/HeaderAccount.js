import React from 'react';
import shoppingBagIcon from '../../images/shopping_bag.png';
import favoriteIcon from '../../images/heart.png';
import accountIcon from '../../images/account.png';
import './header.less';

const HeaderAccount = () => {
    return (
        <div className="header-account">
            <img src={shoppingBagIcon}></img>
            <img src={favoriteIcon}></img>
            <img src={accountIcon}></img>
        </div>
    );
}

export default HeaderAccount;