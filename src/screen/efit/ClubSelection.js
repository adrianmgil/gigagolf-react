import React, { useState } from 'react'
import Button from '../../component/Button/Button';

const ClubSelection = (props) => {

    const [selection, setSelection] = useState({});

    const onSelected = (value) => {
        setSelection({ ...selection, ...value });
        props.onClubSelected(selection);
    };

    const createButton = (key, value, label) => {
        return <Button className={selection[key] === value ? 'buttonSelected' : ''} onClick={() => onSelected({ [key]: value })}>{label ?? value}</Button>
    };

    return (
        <div className="club-selection-wrapper">
            <div className="club-selection-header">SELECT YOUR CLUB(S)</div>
            <div>
                {createButton('gender', 'Male')}
                {createButton('gender', 'Female')}
            </div>
            <div>
                {createButton('hand', 'left' ,'Left Hand')}
                {createButton('hand', 'right' ,'Right Hand')}
            </div>
            <div>
                {createButton('shaft', 'Steel')}
                {createButton('shaft', 'Graphite')}
            </div>
        </div>
    );
};

export default ClubSelection;