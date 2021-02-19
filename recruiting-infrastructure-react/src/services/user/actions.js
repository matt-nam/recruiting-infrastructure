import {
    ATTEMPTING_LOGIN,
    ATTEMPT_LOGIN_SUCCESS,
    ATTEMPT_LOGIN_FAILED,
    ATTEMPTING_LOGOUT,
    ATTEMPT_LOGOUT_SUCCESS,
    ATTEMPT_LOGOUT_FAILED
} from "./action-types";
import { Auth } from "aws-amplify";

export const attemptLogin = (email, password, callback) => {
    return dispatch => {
        dispatch({
            type: ATTEMPTING_LOGIN
        });
        Auth.signIn(email, password)
            .then(() => {
                dispatch({
                    type: ATTEMPT_LOGIN_SUCCESS,
                    payload: email
                })
            })
            .then(callback)
            .catch(e => {
                dispatch({
                    type: ATTEMPT_LOGIN_FAILED,
                    payload: e
                });
                throw e;
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
                throw e;
            });
    }
}

// sign up
