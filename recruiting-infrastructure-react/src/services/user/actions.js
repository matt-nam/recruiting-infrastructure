import {
    ATTEMPTING_GET_CURRENT_USER,
    ATTEMPT_GET_CURRENT_USER_SUCCESS,
    ATTEMPT_GET_CURRENT_USER_FAILED,
    ATTEMPTING_LOGIN,
    ATTEMPT_LOGIN_SUCCESS,
    ATTEMPT_LOGIN_FAILED,
    ATTEMPTING_LOGOUT,
    ATTEMPT_LOGOUT_SUCCESS,
    ATTEMPT_LOGOUT_FAILED,
    ATTEMPTING_SIGN_UP,
    ATTEMPT_SIGN_UP_SUCCESS,
    ATTEMPT_SIGN_UP_FAILED
} from "./action-types";
import { Auth } from "aws-amplify";

// API call returns lots of information, but we only store email
export const attemptGetCurrentUser = () => {
    return dispatch => {
        dispatch({
            type: ATTEMPTING_GET_CURRENT_USER
        });
        Auth.currentAuthenticatedUser()
            .then(e => {
                dispatch({
                    type: ATTEMPT_GET_CURRENT_USER_SUCCESS,
                    payload: e.attributes.email
                });
            })
            .catch(e => {
                dispatch({
                    type: ATTEMPT_GET_CURRENT_USER_FAILED,
                    payload: e
                });
                alert(e.message);
            })
    }
}

export const attemptLogin = (email, password, callback) => {
    return dispatch => {
        dispatch({
            type: ATTEMPTING_LOGIN
        });
        Auth.signIn(email, password)
            .then(e => {
                dispatch({
                    type: ATTEMPT_LOGIN_SUCCESS,
                    payload: e.attributes.email
                })
            })
            .then(callback)
            .catch(e => {
                dispatch({
                    type: ATTEMPT_LOGIN_FAILED,
                    payload: e
                });
                alert(e.message);
            });
    }
}

export const attemptLogout = callback => {
    return dispatch => {
        dispatch({
            type: ATTEMPTING_LOGOUT
        });
        Auth.signOut()
            .then(() => {
                dispatch({
                    type: ATTEMPT_LOGOUT_SUCCESS
                });
            })
            .then(callback)
            .catch(e => {
                dispatch({
                    type: ATTEMPT_LOGOUT_FAILED,
                    payload: e
                });
                alert(e.message);
            });
    }
}

// After sign up, user is automatically signed in (i.e. getCurrentUser returns newly made acct)
export const attemptSignUp = (email, password, callback) => {
    return dispatch => {
        dispatch({
            type: ATTEMPTING_SIGN_UP
        });
        // see documentation for setting other attributes
        Auth.signUp({ username: email, password: password })
            .then(e => {
                dispatch({
                    type: ATTEMPT_SIGN_UP_SUCCESS,
                    payload: e.user.username
                });
            })
            .then(callback)
            .catch(e => {
                dispatch({
                    type: ATTEMPT_SIGN_UP_FAILED,
                    payload: e
                });
                alert(e.message);
            })
    }
}
