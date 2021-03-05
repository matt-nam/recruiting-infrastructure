import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useUser } from "../shared/hooks";
import store from "../services/store"
import { attemptLogout } from "../services/user/actions";

export default function Home() {
    const history = useHistory();
    let { user } = useUser();

    // This UI is a little slow/buggy on logout

    const handleLogin = event => {
        event.preventDefault();
        user.userHasAuthenticated
            ? alert("Oops! Already logged in.")
            : history.push("/login");
    }

    const handleSignup = event => {
        event.preventDefault();
        user.userHasAuthenticated
            ? alert("Oops! Already logged in.")
            : history.push("/signup");
    }

    const handleLogout = event => {
        event.preventDefault();
        user.userHasAuthenticated
            ? store.dispatch(attemptLogout(() => history.push("/")))
            : alert("Oops! Not logged in yet.")
    }

    const printAuth = () => { console.log(user) }

    return (
        <div>
            <h2>Welcome</h2>
            { user.userHasAuthenticated ? (
                <Button onClick={handleLogout}>Log out</Button>
            ) : (
                <Button onClick={handleLogin}>Log in</Button>
            )}
            <Button onClick={handleSignup}>Sign up</Button>
            {/* <Button onClick={printAuth}>Test</Button> */}
        </div>
    );
}