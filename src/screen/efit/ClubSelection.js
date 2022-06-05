import React from 'react'

const ClubSelection = () => {

    return (
        <div className="club-selection-wrapper">
            <div>SELECT YOUR CLUB(S)</div>
            <div>
                <button>Male</button>
                <button>Female</button>
            </div>
            <div>
                <button>Left Hand</button>
                <button>Right Hand</button>
            </div>
            <div>
                <button>Steel</button>
                <button>Graphite</button>
            </div>
        </div>
    );
};

export default ClubSelection;