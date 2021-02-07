import React, { useState, useEffect, useRef } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
// import { useDispatch } from "react-redux";
import './option-selector.scss';

const dispatchKeys = {
    GENERAL_TALENT_POOL_KEY: 0,
    COMPANY_KEY: 1,
    TALENT_POOL_KEY: 2
}

/**
 * Option dropdown selector to be used in the sidebar
 * @param {string} title 
 * @param items A non-empty array of either objects of the form { id: "", name: "", ... } 
 *              or strings if there is no id associated with each name
 *              This is because each company is an object { id: "", name: "" } and
 *              each talent pool is a string (as talent pools don't have IDs)
 */

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

    function isString(myVar) {
        return typeof myVar === 'string' || myVar instanceof String;
    }

    function changeApplicantView(key, data = "") {
        if (key === dispatchKeys.GENERAL_TALENT_POOL_KEY) {
            console.log("Dispatch action to show general talent pool");
        }
        else if (key === dispatchKeys.COMPANY_KEY) {
            console.log("Dispatch action to show applicants with preference for company with id " + data);
        }
        else if (key === dispatchKeys.TALENT_POOL_KEY) {
            console.log("Dispatch action to show applicants of talent pool " + data);
        }
    }

    const s1 = useRef();
    const s2 = useRef();

    function transitionEndCallback(evt) {
        evt.currentTarget.style.overflow = (isOpen ? "visible" : "hidden");
    }

    useEffect(() => {
        const c1 = s1.current;
        const c2 = s2.current;
        c1.addEventListener('transitionend', transitionEndCallback);
        setTimeout(() => {
            if (isOpen) { // show search bar
                c1.style.maxHeight = (c1.scrollHeight + 50) + "px";
                c2.style.maxHeight = null;
            } else {
                c1.style.maxHeight = null;
                c1.style.overflow = "hidden";
                c2.style.maxHeight = c2.scrollHeight + "px";
            }
        }, 0)

        return () => {
            c1.removeEventListener('transitionend', transitionEndCallback);
        };
    });

    return (
        <div className="option-selector">
            <div className="sidebar-dropdown">
                {/* <div className={`sidebar-dropdown-header ${isActive ? 'active' : 'inactive'}`} onClick={() => setIsActive(!isActive)}>— {title}</div> */}
                <div className={`sidebar-dropdown-header`} >
                    {title === "talent pool" ?
                        <span onClick={() => changeApplicantView(dispatchKeys.GENERAL_TALENT_POOL_KEY)}>— {title}</span>
                        : `\u2014 ${title}`}
                </div>
                <button className="sidebar-dropdown-btn" onClick={() => setIsOpen(!isOpen)}>{isOpen ? '\u2212' : '+'}</button>
            </div>
            <div ref={s1} className="accordion-container">
                {isString(items[0]) ? <Multiselect
                    options={items}
                    isObject={false}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    placeholder="Select talent pools"
                /> : <Multiselect
                        options={items}
                        displayValue="name"
                        onSelect={onSelect}
                        onRemove={onRemove}
                        placeholder="Select companies"
                    />}
            </div>
            <div ref={s2} className="accordion-container">
                {usedOptions.length === 0 ? null : <ul >
                    {isString(items[0]) ? usedOptions.map((used, index) => (
                        <li key={used}><span onClick={() => changeApplicantView(dispatchKeys.TALENT_POOL_KEY, used)}>{used}</span></li>
                    )) : usedOptions.map((used, index) => (
                        <li key={used.id}><span onClick={() => changeApplicantView(dispatchKeys.COMPANY_KEY, used.id)}>{used.name}</span></li>
                    ))}
                </ul>}
            </div>
        </div>
    )
};