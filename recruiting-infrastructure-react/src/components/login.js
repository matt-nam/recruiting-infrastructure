import React from 'react';
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import { useFormFields } from "utils/hooksLib";
import { attemptLogin } from "../services/user/actions";
import { useUser } from "../shared/hooks";
import store from "../services/store"

export default function Login() {
    const history = useHistory();
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
    });
    const { user, userHasAuthenticated } = useUser();

    const handleSubmit = event => {
        event.preventDefault();
        store.dispatch(attemptLogin(fields.email, fields.password, () => history.push("/login")))
    }

    const printAuth = () => { console.log(user, userHasAuthenticated) }

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
                <Button onClick={printAuth}>Test</Button>
            </form>
        </div>
    );

};
