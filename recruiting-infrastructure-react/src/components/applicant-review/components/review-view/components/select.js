import React, { useState } from "react";
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

export const Select = ({ field, fieldChanged, value, classProp }) => {
    const handleChange = event => {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        fieldChanged(fieldName, fieldVal)
    }
    return (
        <>
            <ControlLabel>{field.label}</ControlLabel>
            <FormControl className={classProp} componentClass="select" value={value} onChange={handleChange}>
                {field.options.map(({ option, label }, index) => (
                    <option value={value} key={`${value}_${index}`}>
                        {label}
                    </option>
                ))}
            </FormControl>
        </>
    );
};

export default Select;
