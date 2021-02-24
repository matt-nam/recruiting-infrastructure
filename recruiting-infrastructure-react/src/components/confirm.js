import React from 'react';
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import { useFormFields } from "utils/hooksLib";
import store from "../services/store";
import {attemptGetCurrentUser} from "../services/user/actions";

export default function Confirm() {
    const history = useHistory();
    const [fields, handleFieldChange] = useFormFields({
        confirmationCode: ""
    });

    const handleSubmit = event => {
        event.preventDefault();
        // call to action for confirming sign up (i.e. Auth.confirmSignUp())
        // https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#confirmsignup
        // or other verification method
        history.push("/");
    }

    const getCurrentUser = () => {
        store.dispatch(attemptGetCurrentUser());
    }

    return (
        <div>
            <h2>Confirm sign up</h2>
            <form onSubmit={handleSubmit}>
                <ControlLabel id="signup-text">yes internship program</ControlLabel>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <FormControl
                        autoFocus
                        placeholder="confirmation code"
                        type="string"
                        value={fields.confirmationCode}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </form>
            <Button onClick={getCurrentUser}>Test</Button>
        </div>
    );

};
