import React from 'react';
import gigaGolfLogo from '../../images/gigagolf.png';
import './header.less';

const GGLogo = ({ showText = false }) => {
    return (
        <div className="gigagolf-logo">
            <img src={gigaGolfLogo} alt='[image]'></img>
            { showText && <label>Today's Golf Club Technology Custom Fit for Your Game</label>}
        </div>
    )
}

export default GGLogo;
