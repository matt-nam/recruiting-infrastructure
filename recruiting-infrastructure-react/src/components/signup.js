import React from 'react';
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import { useFormFields } from "utils/hooksLib";
import { attemptSignUp } from "../services/user/actions";
import store from "../services/store"

export default function SignUp() {
    const history = useHistory();
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        name: "",
        calendly: ""
    });

    const handleSubmit = event => {
        event.preventDefault();
        store.dispatch(attemptSignUp(fields.email, fields.password, fields.name, fields.calendly, () => { history.push("/confirm") }))
    }

    return (
        <div>
            <h2>Sign up</h2>
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
                <FormGroup controlId="name" bsSize="large">
                    <FormControl
                        placeholder="name"
                        type="name"
                        value={fields.name}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="calendly" bsSize="large">
                    <FormControl
                        placeholder="calendly link"
                        type="calendly"
                        value={fields.calendly}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );

};
