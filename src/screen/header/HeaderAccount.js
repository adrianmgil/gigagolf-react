import React from 'react';
import shoppingBagIcon from '../../images/shopping_bag.png';
import favoriteIcon from '../../images/heart.png';
import accountIcon from '../../images/account.png';
import './header.less';
import { BASE_URL } from '../../constants';

const HeaderAccount = () => {
    const onViewCartClicked = () => {
        window.location=BASE_URL + '/view_cart.jsp?modify=true';
    };

    const onAccountClicked = () => {
        window.location=BASE_URL + '/pre_login.jhtml';
    };

    const onWishlistClicked = () => {
        window.location=BASE_URL + '/checkout/user/view_wishlist.jsp';
    };

    return (
        <div className="header-account">
            <img src={shoppingBagIcon} onClick={onViewCartClicked} ></img>
            <img src={favoriteIcon} onClick={onWishlistClicked}></img>
            <img src={accountIcon} onClick={onAccountClicked}></img>
        </div>
    );
}

export default HeaderAccount;