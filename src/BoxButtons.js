import React, { Component } from 'react';
import Collapse from 'react-collapse';

const BoxButtons = (props) => {
    return (
        <Collapse isOpened={props.isOpened} springConfig={{stiffness: 300, damping: 40}}>
            <div className="button-wrapper">
                <button className="delete" id={props.index} onClick={props.delete}>Delete</button>
                <button className="edit" id={props.index} onClick={props.edit}>Edit</button>
            </div>
        </Collapse>
    );
};

export default BoxButtons;