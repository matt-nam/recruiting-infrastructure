import {
    ATTEMPTING_LOGIN,
    ATTEMPT_LOGIN_SUCCESS,
    ATTEMPT_LOGIN_FAILED
} from "./action-types";
import { Auth } from "aws-amplify";

export const attemptLogin = (email, password, callback) => {
    return dispatch => {
        dispatch({
            type: ATTEMPTING_LOGIN
        })
        Auth.signIn(email, password)
            .then(() => {
                dispatch({
                    type: ATTEMPT_LOGIN_SUCCESS,
                    payload: email
                });
                callback();
            })
            .catch(e => {
                dispatch({
                    type: ATTEMPT_LOGIN_FAILED,
                    payload: e
                });
                throw e;
            })
    }

}

// log out

// sign up
