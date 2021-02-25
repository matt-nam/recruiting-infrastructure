import React from 'react';
import { useSelector } from "react-redux";
import "./dropdown.scss";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { setTableFilterOptions } from "services/applications/actions"
import { getApplicationFilterOptions } from 'services/applications/selectors';
import { useDispatch } from "react-redux";

const customStyles = {
    menuList: () => ({
        // none of react-select's styles are passed to <Control />
        maxHeight: '120px',
        overflow: 'scroll',
        zIndex: 9999,
    }),
}

export const Dropdown = ({ title, items, filterName }) => {

    const dispatch = useDispatch();
    let filterOptions = useSelector(state => getApplicationFilterOptions(state));

    const handleChange = (e) => {
        // if item is being removed
        if (e) {
            dispatch(setTableFilterOptions({ Option: filterName, Value: e.map(opt => opt.value) }));
        } else {
            dispatch(setTableFilterOptions({ Option: filterName, Value: [] }));
        }
    }

    // const animatedComponents = makeAnimated();
    let dropdownOptions = [];
    let defaultOptions = [];
    if (filterName.substr(0, 4) !== "Rank") {
        for (let i = 0; i < items.length; i++) {
            var obj = {
                value: items[i],
                label: items[i]
            };
            dropdownOptions.push(obj);
            if (filterOptions[filterName].includes(items[i])) {
                defaultOptions.push(obj);
            }
        }
    } else {
        for (let i = 0; i < items.length; i++) {
            var obj = {
                value: items[i].id,
                label: items[i].name
            };
            dropdownOptions.push(obj)
            if (filterOptions[filterName].includes(items[i].id)) {
                defaultOptions.push(obj);
            }
        }
    }

    return (
        <div className="filter-dropdown">
            <Select
                value={defaultOptions}
                options={dropdownOptions}
                isMulti
                name="dropdown"
                className="basic-multi-select"
                classNamePrefix="select"
                // components={animatedComponents}
                onChange={handleChange}
                placeholder={title}
                styles={customStyles} />
        </div>
    )
}