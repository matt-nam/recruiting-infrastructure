import React, { useState } from "react";
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

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
                        {label}
                    </option>
                ))}
            </FormControl>
        </>
    );
};

export default Select;
