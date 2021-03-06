import { User } from "../../shared/models/user.model";
import {
    ATTEMPTING_LOGIN,
    ATTEMPT_LOGIN_SUCCESS,
    ATTEMPT_LOGIN_FAILED,
    ATTEMPTING_LOGOUT,
    ATTEMPT_LOGOUT_SUCCESS,
    ATTEMPT_LOGOUT_FAILED,
    ATTEMPTING_SIGN_UP,
    ATTEMPT_SIGN_UP_SUCCESS,
    ATTEMPT_SIGN_UP_FAILED,
    ATTEMPTING_GET_CURRENT_USER, ATTEMPT_GET_CURRENT_USER_SUCCESS, ATTEMPT_GET_CURRENT_USER_FAILED
} from "./action-types";
import { LOADING, LOADED, FAILED } from "../constants";

const initialState = {
    user: new User(),
    status: LOADED,
    userHasAuthenticated: false
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case ATTEMPTING_GET_CURRENT_USER: {
            return {
                ...state,
                status: LOADING
            }
        }
        case ATTEMPT_GET_CURRENT_USER_SUCCESS: {
            return {
                ...state,
                user: new User(action.payload),
                userHasAuthenticated: true,
                status: LOADED
            }
        }
        case ATTEMPT_GET_CURRENT_USER_FAILED: {
            return {
                ...state,
                status: FAILED
            }
        }
        case ATTEMPTING_LOGIN: {
            return {
                ...state,
                status: LOADING
            }
        }
        case ATTEMPT_LOGIN_SUCCESS: {
            return {
                ...state,
                user: new User(action.payload),
                userHasAuthenticated: true,
                status: LOADED,
            };
        }
        case ATTEMPT_LOGIN_FAILED: {
            return {
                ...state,
                status: FAILED
            }
        }
        case ATTEMPTING_LOGOUT: {
            return {
                ...state,
                status: LOADING
            }
        }
        case ATTEMPT_LOGOUT_SUCCESS: {
            return {
                ...state,
                user: new User(),
                userHasAuthenticated: false,
                status: LOADED
            }
        }
        case ATTEMPT_LOGOUT_FAILED: {
            return {
                ...state,
                status: FAILED
            }
        }
        case ATTEMPTING_SIGN_UP: {
            return {
                ...state,
                status: LOADING
            }
        }
        case ATTEMPT_SIGN_UP_SUCCESS: {
            return {
                ...state,
                status: LOADED,
                user: new User(action.payload)
            }
        }
        case ATTEMPT_SIGN_UP_FAILED: {
            return {
                ...state,
                status: FAILED
            }
        }
        default:
            return state;
    }
}

export default userReducer
