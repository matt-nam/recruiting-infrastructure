import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { Auth } from "aws-amplify";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContext } from "utils/contextLib";


function App() {
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
        }
        catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        setIsAuthenticating(false);
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