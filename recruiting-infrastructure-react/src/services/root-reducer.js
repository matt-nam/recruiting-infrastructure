import { combineReducers } from "redux";
import applications from "./applications/applicationReducer";
import startups from "./startups/startupReducer";
import user from "./user/userReducer";

export default combineReducers({ applications, startups, user });