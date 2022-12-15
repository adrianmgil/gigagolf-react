import React from "react";
import Button from "../../component/Button/Button";

const ShoppingButtons = () => {
    return (
        <div className="shopping-buttons-wrapper">
            <Button className="gg-round-button">Add to cart</Button>
            <Button className="gg-round-button">Add to wishlist</Button>
        </div>
    );
};

export default ShoppingButtons;