import React from "react";
import { ControlLabel, FormControl } from 'react-bootstrap'

export const Number = ({ field, fieldChanged, values, classProp }) => {
    const handleChange = event => {
        let fieldName = field.name;
        let fieldVal = event.target.value;
        const re = /^[0-9\b]+$/;

        if (fieldVal === '' || re.test(fieldVal)) {
            let intFieldVal = parseInt(fieldVal)
            if (isNaN(intFieldVal)) {
                fieldChanged(fieldName, "")
            }
            if (0 <= intFieldVal && intFieldVal <= 10) {
                fieldChanged(fieldName, fieldVal)
            }
        }
    }
    return (
        <>
            <ControlLabel>{field.label}</ControlLabel>
            <FormControl className={classProp} value={values} type="text" onChange={handleChange} />
        </>
    );
};

export default Number;
