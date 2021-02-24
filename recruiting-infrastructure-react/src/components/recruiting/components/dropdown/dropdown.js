import React from 'react';
import "./dropdown.scss";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// import { setOptions } from "redux/actions"
// import { useDispatch } from "react-redux";

const customStyles = {
    menuList: () => ({
        // none of react-select's styles are passed to <Control />
        maxHeight: '120px',
        overflow: 'scroll',
        zIndex: 9999,
    }),
}

export const Dropdown = ({ title, items, filterName }) => {

    // const dispatch = useDispatch();

    // const handleChange = (e) => {
    //     // if item is being removed
    //     if (e) {
    //         dispatch(setOptions({ Option: filterName, Value: e.map(opt => opt.value) }));
    //     } else {
    //         dispatch(setOptions({ Option: filterName, Value: [] }));
    //     }
    // }

    const animatedComponents = makeAnimated();
    let dropdownOptions = [];
    if (filterName.substr(0, 4) !== "Rank") {
        for (let i = 0; i < items.length; i++) {
            dropdownOptions.push({
                value: items[i],
                label: items[i]
            })
        }
    } else {
        console.log(items)
        for (let i = 0; i < items.length; i++) {
            dropdownOptions.push({
                value: items[i].id,
                label: items[i].name
            })
        }
    }


    return (
        <div className="filter-dropdown">
            <Select
                options={dropdownOptions}
                isMulti
                name="dropdown"
                className="basic-multi-select"
                classNamePrefix="select"
                components={animatedComponents}
                // onChange={handleChange}
                placeholder={title}
                styles={customStyles} />
        </div>
    )
}