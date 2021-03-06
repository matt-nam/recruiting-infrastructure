import React, { useState } from "react";
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

export const Input = ({ field, fieldChanged, value }) => {
    return (
        <>
            <ControlLabel>{field.label}</ControlLabel>
            <FormControl type="text" {...field}>
            </FormControl>
        </>
    );
};

export default Input;
