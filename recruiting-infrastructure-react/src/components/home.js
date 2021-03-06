import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useUser } from "../shared/hooks";
import { useAppContext } from "utils/contextLib";
import store from "../services/store"
import { attemptLogout } from "../services/user/actions";

export default function Home() {
    const history = useHistory();
    const { isAuthenticated, userHasAuthenticated } = useAppContext();
    let { user } = useUser();

    // This UI is a little slow/buggy on logout

    const handleLogin = event => {
        event.preventDefault();
        user.userHasAuthenticated || isAuthenticated
            ? alert("Oops! Already logged in.")
            : history.push("/login");
    }

    const handleSignup = event => {
        event.preventDefault();
        if (user.userHasAuthenticated || isAuthenticated) {
            alert("Oops! Already logged in.");
        } else {
            history.push("/signup");
        }
    }

    const handleLogout = event => {
        event.preventDefault();
        if (user.userHasAuthenticated || isAuthenticated) {
            store.dispatch(attemptLogout(() => history.push("/")));
            userHasAuthenticated(false);
        } else {
            alert("Oops! Not logged in yet.")
        }
    }

    const printAuth = () => { console.log(user) }

    return (
        <div>
            <h2>Welcome</h2>
            { user.userHasAuthenticated || isAuthenticated ? (
                <Button onClick={handleLogout}>Log out</Button>
            ) : (
                <React.Fragment>
                    <Button onClick={handleLogin}>Log in</Button>
                    <Button onClick={handleSignup}>Sign up</Button>
                </React.Fragment>
            )}

            {/* <Button onClick={printAuth}>Test</Button> */}
        </div>
    );
}