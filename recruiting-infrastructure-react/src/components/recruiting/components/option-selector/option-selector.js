import React, { useState } from "react";
import './option-selector.scss';

export const OptionSelector = ({title, items}) => {
    var initialUsedOptionsState = Array(items.length).fill(false);
    const [isOpen, setIsOpen] = useState(false);
    const [usedOptions, setUsedOptions] = useState(initialUsedOptionsState);
    // const [isActive, setIsActive] = useState(false);
    const options = [];

    function toggleOption(index) {
        const newUsedOptions = [...usedOptions];
        newUsedOptions[index] = !newUsedOptions[index];
        setUsedOptions(newUsedOptions);
    }

    for (let i = 0; i < items.length; i++) {
        options.push(<li 
            // className={`${usedOptions[i] ? 'active' : ''}`} 
            onClick={() => {toggleOption(i)}}>{(usedOptions[i] ? '\u2212 ' : '+ ') + items[i]}</li>);
    }
    return (
        <div className="option-selector">
            <div className="sidebar-dropdown">
                {/* <div className={`sidebar-dropdown-header ${isActive ? 'active' : 'inactive'}`} onClick={() => setIsActive(!isActive)}>— {title}</div> */}
                <div className={`sidebar-dropdown-header`} >— {title}</div>
                <button className="sidebar-dropdown-btn" onClick={() => setIsOpen(!isOpen)}>{isOpen ? '\u2212' : '+'}</button>
            </div>
            <ul>
                {isOpen ? options : usedOptions.map((used, index) => (used ? 
                    <li>{items[index]}</li> : null
                ))}
            </ul>
        </div>
    )
};