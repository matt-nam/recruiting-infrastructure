import React, {useState} from "react";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContext } from "utils/contextLib";


function App() {

    const [isAuthenticated, userHasAuthenticated] = useState(false);

    return (
      <Router>
          <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
              <div className="main-div">
                  <Routes/>
              </div>
          </AppContext.Provider>
      </Router>
    );

}

export default App;