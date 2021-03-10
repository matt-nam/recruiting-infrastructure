import React from "react";
import { ControlLabel, FormControl } from 'react-bootstrap'
import { statusMap } from "services/constants";

export const Select = ({ field, fieldChanged, values, classProp }) => {
    const handleChange = event => {
        let fieldName = field.name;
        let fieldVal = event.target.value;
        fieldChanged(fieldName, fieldVal)
    }
    return (
        <>
            <ControlLabel>{field.label}</ControlLabel>
            <FormControl className={classProp} componentClass="select" value={values} onChange={handleChange}>
                {field.options.map(({ label }, index) => (
                    <option value={label} key={`${values}_${index}`}>
                        {statusMap[label]}
                    </option>
                ))}
            </FormControl>
        </>
    );
};

export default Select;
