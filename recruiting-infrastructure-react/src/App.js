import React, { useState, useEffect } from "react";
import Routes from "./routes";
import { Auth } from "aws-amplify";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContext } from "utils/contextLib";
import { useDispatch } from "react-redux";
import { ATTEMPT_LOGIN_SUCCESS } from "services/user/action-types";

function App() {
    const dispatch = useDispatch();
    
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            await Auth.currentSession();
            let userInfo = await Auth.currentUserInfo();
            userHasAuthenticated(true);
            dispatch({
                type: ATTEMPT_LOGIN_SUCCESS,
                payload: userInfo.attributes.email
            });
        }
        catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }
    }

    return (
        <Router>
            <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
                <div className="main-div">
                    <Routes />
                </div>
            </AppContext.Provider>
        </Router>
    );

}

export default App;