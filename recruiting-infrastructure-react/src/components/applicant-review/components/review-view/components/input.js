import React from "react";
import { FormControl } from 'react-bootstrap'

export const Input = ({ field, fieldChanged, values, classProp, numRow }) => {
    const handleChange = event => {
        let fieldName = field.name;
        let fieldVal = event.target.value;
        fieldChanged(fieldName, fieldVal)
    }
    return (
        <>
            <FormControl className={classProp} value={values} componentClass="textarea" rows={numRow} onChange={handleChange} />
        </>
    );
};

export default Input;
