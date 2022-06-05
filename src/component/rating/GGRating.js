import React from 'react';
import StarRatings from 'react-star-ratings/build/star-ratings';
import './GGRating.less';

const GGRating = ({
        name = 'rating',
        rating,
        message,
        link,
        numberOfStars = 5,
        size = '15px',
        color = 'black',
        emptyColor,
        hoverColor = 'yellow',
        className,
        style,
        onClick,
    }) => {

    return (
        <div className={className} style={style} >
            <StarRatings
                rating={rating}
                numberOfStars={numberOfStars}
                name={name}
                starDimension={size}
                starSpacing={'0px'}
                starRatedColor={color}
                starEmptyColor={emptyColor}
                starHoverColor={hoverColor}
            />
            <div className="gg-rating-message">{message}</div>
            <div className="gg-rating-writeLink" onClick={onClick}>{link}</div>
        </div>
    );
};

export default GGRating;