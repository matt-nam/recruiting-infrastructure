import { User } from "../../shared/models/user.model";
import { ATTEMPTING_LOGIN, ATTEMPT_LOGIN_SUCCESS, ATTEMPT_LOGIN_FAILED  } from "./action-types";
import { LOADING, LOADED, FAILED } from "../constants";

const initialState = {
    user: new User(),
    status: LOADED,
    userHasAuthenticated: false
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case ATTEMPTING_LOGIN: {
            return {
                ...state,
                status: LOADING,
            }
        }
        case ATTEMPT_LOGIN_SUCCESS: {
            return {
                ...state,
                user: new User(action.payload),
                status: LOADED,
                userHasAuthenticated: true
            };
        }
        case ATTEMPT_LOGIN_FAILED: {
            return {
                ...state,
                status: FAILED,
            }
        }
        // logout
        // signups
        default:
            return state;
    }
}

export default userReducer
