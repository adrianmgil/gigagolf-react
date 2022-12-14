import React, { useState, useCallback } from 'react';
import { BASE_URL, NEXT_ICON, PREV_ICON } from '../../constants';
import './slider.less';

const ImageSlider = (
    {
        image,
        length = 4,
        baseUrl = BASE_URL,
        suffix = 'jpg',
        prevIcon = PREV_ICON,
        nextIcon = NEXT_ICON,
    }) => {

    const [index, setIndex] = useState(1    );

    const handleClick = useCallback(
        (newValue) => {
            setIndex(newValue > length ? 1 : newValue == 0 ? (length) : newValue);
        },
        [index]
    );

    return (
        <div className="imageSlider-container"> 
            <div className="imageSlider-small-image">
                {
                    [...Array(length)].map((e, i) =>
                        (
                            <img
                                key={'smallImage' + i}
                                src={`${baseUrl}/${image}/${i+1}.${suffix}`} width={48}
                                className={index == i+1 ? 'selected':''}
                                onClick={() => handleClick(i+1)}
                            />
                        )
                    )
                }
            </div>
            <div>
                <img
                    className="imageSlider-button"
                    src={`${baseUrl}/${prevIcon}`}
                    onClick={() => handleClick(index-1)}
                />
                <img
                    className="imageSlider-large-image"
                    src={`${baseUrl}/${image}/${index}.${suffix}`} />
                <img
                    className="imageSlider-button right"
                    src={`${baseUrl}/${nextIcon}`}
                    onClick={() => handleClick(index+1)}
                />
            </div>
        </div>
    );
};

export default ImageSlider;