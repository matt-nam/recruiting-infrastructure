import React from 'react';
import { useAppContext } from "../utils/contextLib";
import { useHistory } from "react-router-dom";
import {FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap";
import { useFormFields } from "utils/hooksLib";
import  { Auth } from "aws-amplify";

export default function Login() {
    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
    });

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <ControlLabel id="signup-text">yes internship program</ControlLabel>
                <FormGroup controlId="email" bsSize="large">
                    <FormControl
                        autoFocus
                        placeholder="email"
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormControl
                        placeholder="password"
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );

};
