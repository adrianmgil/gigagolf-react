import React from "react";
import Button from "../../component/Button/Button";

const ShoppingButtons = () => {
    const onAddCart = () => {

    };

    return (
        <div className="shopping-buttons-wrapper">
            <Button className="gg-round-button" onClick={onAddCart}>Add to cart</Button>
            <Button className="gg-round-button gg-black">Add to wishlist</Button>
        </div>
    );
};

export default ShoppingButtons;