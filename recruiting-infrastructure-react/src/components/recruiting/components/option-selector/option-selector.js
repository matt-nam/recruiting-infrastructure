import React, { useState, useEffect, useRef } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from "react-redux";
import { getApplicationFilterOptions } from 'services/applications/selectors';
import { setApplicationsFilterOptions } from 'services/applications/actions';
import { VIEW_COMPANY, VIEW_TALENT_POOL } from 'services/constants';
import './option-selector.scss';

function isString(myVar) {
    return typeof myVar === 'string' || myVar instanceof String;
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
    const dispatch = useDispatch();
    const filterOptions = useSelector(state => getApplicationFilterOptions(state));

    const [isOpen, setIsOpen] = useState(false);
    const [usedOptions, setUsedOptions] = useState([]);
    const [accordionMaxHeight, setAccordionMaxHeight] = useState(0);

    function onSelect(selectedList, selectedItem) {
        setAccordionMaxHeight(s1.current.scrollHeight);
        setUsedOptions(selectedList);
    }

    function onRemove(selectedList, removedItem) {
        setAccordionMaxHeight(s1.current.scrollHeight);
        setUsedOptions(selectedList);
    }

    function changeApplicantView(key, data = "") {
        dispatch(setApplicationsFilterOptions({ viewType: key, viewValue: data }));
    }

    const s1 = useRef();
    const s2 = useRef();

    useEffect(() => {
        const c1 = s1.current;
        const c2 = s2.current;
        if (isOpen) { // show search bar
            c2.style.maxHeight = null;
            setTimeout(function(){ if (isOpen) { c1.style.overflow = "visible"; } }, 250);
        } else {
            c1.style.maxHeight = null;
            c1.style.overflow = "hidden";
            c2.style.maxHeight = c2.scrollHeight + "px";
        }
    });

    return (
        <div className="option-selector">
            <div className="sidebar-dropdown">
                {/* <div className={`sidebar-dropdown-header ${isActive ? 'active' : 'inactive'}`} onClick={() => setIsActive(!isActive)}>— {title}</div> */}
                <div className={`sidebar-dropdown-header`} >
                    {title === "talent pool" ?
                        <span className={filterOptions.ViewType === VIEW_TALENT_POOL && filterOptions.ViewValue === "" ? "active clickable" : "clickable"}
                            onClick={() => changeApplicantView(VIEW_TALENT_POOL)}>— {title}</span>
                        : `\u2014 ${title}`}
                </div>
                <button className="sidebar-dropdown-btn" onClick={() => {setIsOpen(!isOpen); setAccordionMaxHeight(s1.current.scrollHeight);}}>{isOpen ? '\u2212' : '+'}</button>
            </div>
            <div ref={s1} className="accordion-container" style={{maxHeight: accordionMaxHeight }}>
                {isString(items[0]) ? <Multiselect
                    options={items}
                    isObject={false}
                    onSelect={onSelect}
                    closeOnSelect={false}
                    avoidHighlightFirstOption={true}
                    onRemove={onRemove}
                    placeholder="Select talent pools"
                /> : <Multiselect
                        options={items}
                        displayValue="name"
                        onSelect={onSelect}
                        closeOnSelect={false}
                        avoidHighlightFirstOption={true}
                        onRemove={onRemove}
                        placeholder="Select companies"
                    />}
            </div>
            <div ref={s2} className="accordion-container">
                {usedOptions.length === 0 ? null : <ul >
                    {isString(items[0]) ? usedOptions.map((used, index) => (
                        <li key={used}>
                            <span className={filterOptions.ViewType === VIEW_TALENT_POOL && filterOptions.ViewValue === used ? "active clickable" : "clickable"}
                                onClick={() => changeApplicantView(VIEW_TALENT_POOL, used)}
                            >{used}</span>
                        </li>
                    )) : usedOptions.map((used, index) => (
                        <li key={used.id}>
                            <span className={filterOptions.ViewType === VIEW_COMPANY && filterOptions.ViewValue.id === used.id ? "active clickable" : "clickable"}
                                onClick={() => changeApplicantView(VIEW_COMPANY, used)}
                            >{used.name}</span>
                        </li>
                    ))}
                </ul>}
            </div>
        </div>
    )
};