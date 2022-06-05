import React from 'react';
import ImageSlider from '../../component/Slider/ImageSlider';

const Club = ({ groupnum }) => {

    return (
        <ImageSlider image={`images/studio330/${groupnum.replace('-SET','')}`} count={4} />
    );
}

export default Club;