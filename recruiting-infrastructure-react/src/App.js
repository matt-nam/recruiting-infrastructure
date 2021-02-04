import React, { useState, useEffect, useLayoutEffect } from "react";
import Routes from "./Routes";
import { AppContext } from "utils/contextLib";

import { BrowserRouter as Router, useLocation, useHistory } from "react-router-dom";
// import { useController } from 'react-scroll-parallax';

function App() {

    const history = useHistory();
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    async function handleLogout() {
        userHasAuthenticated(false);
        history.push("/login");
    }

    return (
        <Router>
            <ScrollToTop />
            <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
                <div className="main-div">
                    <Routes />
                </div>
            </AppContext.Provider>
        </Router>
    );
}

function ScrollToTop({ history }) {
    const { pathname } = useLocation();

    // const { parallaxController } = useController();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
            // setTimeout(() => {
            //     parallaxController.update();
            //     window.scrollTo(0, 1);
            // }, 300);
        }, 300);
    }, [pathname]);

    return null;
}

export default App;