import { combineReducers } from "redux";
import applications from "./applications/applicationReducer";
import startups from "./startups/startupReducer";

export default combineReducers({ applications, startups });
