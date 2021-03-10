import React from "react";
import Select from 'react-select';

export const MultiSelect = ({ field, fieldChanged, values, options, classProp }) => {

    const handleChange = event => {
        let fieldName = field.name;
        if (event) {
            let fieldVal = event.map(opt => opt.id)
            fieldChanged(fieldName, fieldVal)
        } else {
            fieldChanged(fieldName, [])
        }
    }

    let dropdownOptions = options.map(item => {
        return {
            value: item.Name,
            label: item.Name,
            id: item.Id
        }
    })
    var selectedOptions = []
    if (values) {
        selectedOptions = values.map(item => {
            return {
                value: item.Name,
                label: item.Name,
                id: item.Id
            }
        })
    }

    return (
        <React.Fragment>
            <label>{field.label}</label>
            <Select
                value={selectedOptions}
                options={dropdownOptions}
                isMulti
                name="dropdown"
                className={`basic-multi-select ${classProp}`}
                classNamePrefix="select"
                onChange={handleChange} />
        </React.Fragment>
    );
};

export default MultiSelect