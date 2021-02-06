import React, { useState } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import './option-selector.scss';

export const OptionSelector = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [usedOptions, setUsedOptions] = useState([]);
    // const [isActive, setIsActive] = useState(false);

    function onSelect(selectedList, selectedItem) {
        setUsedOptions(selectedList);
    }

    function onRemove(selectedList, removedItem) {
        setUsedOptions(selectedList);
    }

    return (
        <div className="option-selector">
            <div className="sidebar-dropdown">
                {/* <div className={`sidebar-dropdown-header ${isActive ? 'active' : 'inactive'}`} onClick={() => setIsActive(!isActive)}>— {title}</div> */}
                <div className={`sidebar-dropdown-header`} >— {title}</div>
                <button className="sidebar-dropdown-btn" onClick={() => setIsOpen(!isOpen)}>{isOpen ? '\u2212' : '+'}</button>
            </div>
            <div className={isOpen ? "" : "hide"}><Multiselect
                options={items}
                isObject={false}
                onSelect={onSelect}
                onRemove={onRemove}
            /></div>
            <ul>
                {isOpen ? null : usedOptions.map((used, index) => (
                    <li>{used}</li>
                ))}
            </ul>
        </div>
    )
};