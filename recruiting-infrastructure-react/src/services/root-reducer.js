import { combineReducers } from "redux";
import applications from "./applications/applicationReducer";
import startups from "./startups/startupReducer";
import user from "./user/userReducer";
import email from "./email/emailReducer"

export default combineReducers({ applications, startups, user, email });