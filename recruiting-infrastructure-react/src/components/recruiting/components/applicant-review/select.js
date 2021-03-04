import React, { useState } from "react";
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

export const Select = ({ field, fieldChanged, value }) => {
    return (
        <>
            <ControlLabel>{field.label}</ControlLabel>
            <FormControl componentClass="select" {...field}>
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
