import { combineReducers } from "redux";
import applications from "./applications/applicationReducer";
import user from "./user/userReducer";

export default combineReducers({ applications, user });
