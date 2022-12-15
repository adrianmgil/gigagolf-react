import React, { useCallback, useState, useRef } from 'react';
import { BASE_URL, NEXT_ICON, PREV_ICON } from '../../constants';
import './Carousel.less';

const Carousel = (
{
    children,
    baseUrl = BASE_URL,
    leftArrow = PREV_ICON,
    rightArrow = NEXT_ICON,
}) => {
    const refComponent = useRef(null);
    const refContainer = useRef(null);
    const [position, setPosition] = useState({ x: 0, left: false, right: true });

    const handleRotate = useCallback((direction) => {
        const containerWidth = refContainer.current.offsetWidth;
        const componentWidth = refComponent.current.offsetWidth;
        const posDelta = containerWidth / 1.5;
        const x = position.x;

        if (direction === 'left') {
            const leftDisabled = -x <= posDelta;
            setPosition({ x: leftDisabled ? 0 : x + posDelta, left: !leftDisabled, right: true });
        } else {
            const rightDisabled = x < containerWidth + posDelta - componentWidth;
            setPosition({ x: rightDisabled ? containerWidth - componentWidth : x - posDelta, left: true, right: !rightDisabled });
        }
    }, [position, refContainer.current?.offsetWidth, refComponent.current?.offsetWidth]);

    return (
        <div className="gg-carousel-wrapper">
            <img src={`${baseUrl}/${leftArrow}`} onClick={() => handleRotate('left')} disabled={!position.left}></img>
            <div ref={refContainer} className="gg-carousel-component">
                <div ref={refComponent} style={{ transform: `translateX(${position.x}px)` }}>
                    {children}
                </div>
            </div>
            <img src={`${baseUrl}/${rightArrow}`} onClick={() => handleRotate('right')} disabled={!position.right} />
        </div>
    );
};

export default Carousel;