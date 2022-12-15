import { React } from 'react';
import PropTypes from 'prop-types';
import './button.less';

const Button = (props) => {
    return (
        <div {...props} className={`gg-button ${props.className}`}>
            {props.children}
        </div>
    );
};

Button.propTypes = {
    props: PropTypes.object,
};

export default Button;
