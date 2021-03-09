import React from "react";
import CreatableSelect from 'react-select/creatable';

export const CreatableMultiSelect = ({ field, fieldChanged, values, options, classProp }) => {

    const handleChange = event => {
        let fieldName = field.name;
        if (event) {
            let fieldVal = event.map(opt => opt.id)
            fieldChanged(fieldName, fieldVal)
        } else {
            fieldChanged(fieldName, [])
        }
    }

    const handleCreate = inputValue => {
        let fieldName = field.name;
        if (inputValue) {
            let fieldVal = values.map(opt => opt.Id)
            fieldVal.push(inputValue)
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
            <CreatableSelect
                value={selectedOptions}
                options={dropdownOptions}
                isMulti
                name="dropdown"
                className={`basic-multi-select ${classProp}`}
                classNamePrefix="select"
                onCreateOption={handleCreate}
                onChange={handleChange} />
        </React.Fragment>
    );
};

export default CreatableMultiSelect