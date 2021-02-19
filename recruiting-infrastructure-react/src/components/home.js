import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useUser } from "../shared/hooks";
import store from "../services/store"
import { attemptLogout } from "../services/user/actions";

export default function Home() {
    const history = useHistory();
    let { user, userHasAuthenticated } = useUser();

    // This UI is buggy (React isn't reloading the component on state change)
    // but the redux code works

    const handleLogin = event => {
        console.log(userHasAuthenticated, user);
        event.preventDefault();
        userHasAuthenticated
            ? alert("Oops! Already logged in.")
            : history.push("/login");
    }

    const handleLogout = event => {
        console.log(userHasAuthenticated, user);
        event.preventDefault();
        userHasAuthenticated
            ? store.dispatch(attemptLogout(() => history.push("/")))
            : alert("Oops! Not logged in yet.")
    }

    const printAuth = () => { console.log(user, userHasAuthenticated) }

    return (
        <div>
            <h2>Welcome</h2>
            <Button onClick={handleLogin}>Log in</Button>
            <Button onClick={handleLogout}>Log out</Button>
            <Button onClick={printAuth}>Test</Button>
        </div>
    );
}