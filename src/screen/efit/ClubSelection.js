import React from 'react'
import Button from '../../component/Button/Button';

const ClubSelection = () => {

    return (
        <div className="club-selection-wrapper">
            <div className="club-selection-header">SELECT YOUR CLUB(S)</div>
            <div>
                <Button onClick={() => console.log('test')}>Male</Button>
                <Button>Female</Button>
            </div>
            <div>
                <Button>Left Hand</Button>
                <Button>Right Hand</Button>
            </div>
            <div>
                <Button>Steel</Button>
                <Button>Graphite</Button>
            </div>
        </div>
    );
};

export default ClubSelection;