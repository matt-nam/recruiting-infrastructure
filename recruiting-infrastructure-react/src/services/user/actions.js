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
    ATTEMPT_SIGN_UP_FAILED,
    ATTEMPTING_FETCH_RECRUITERS,
    ATTEMPT_FETCH_RECRUITERS_SUCCESS,
    ATTEMPT_FETCH_RECRUITERS_FAILED
} from "./action-types";
import { Auth } from "aws-amplify";
import client from "../api"
import store from "services/store";
import {fetchApplications } from "services/applications/actions"
import { fetchStartups } from 'services/startups/actions';
import { RecruiterList, recruiterListFactory } from "shared/models/recruiterList.model";

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
                store.dispatch(fetchApplications);
                store.dispatch(fetchStartups);
                store.dispatch(fetchRecruiters);
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
export const attemptSignUp = (email, password, name, calendly, callback) => {
    return dispatch => {
        dispatch({
            type: ATTEMPTING_SIGN_UP
        });
        // see documentation for setting other attributes
        Auth.signUp({ username: email, password: password })
            .then(e => {
                var body = {
                    "Email": email, 
                    "Name": name,
                    "CalendlyLink": calendly
                }
                client.post('main-app', '/recruiter', body)
                    .then(r => {
                        console.log(r)
                        dispatch({
                            type: ATTEMPT_SIGN_UP_SUCCESS,
                            payload: {email: e.user.username, name, calendlyLink: calendly}
                        });
                    })
                    .catch(err => {
                        console.error(err); // log since might be a render err
                        dispatch({  
                            type: ATTEMPT_SIGN_UP_FAILED,
                            payload: err
                        });
                    })
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

export const fetchRecruiters = (dispatch) => {
    dispatch({ type: ATTEMPTING_FETCH_RECRUITERS })

    client.get('main-app', '/recruiters')
        .then(r => {
            let res = recruiterListFactory(r)
            dispatch({
                type: ATTEMPT_FETCH_RECRUITERS_SUCCESS,
                payload: res
            })
        })
        .catch(err => {
            console.error(err); // log since might be a render err
            dispatch({
                type: ATTEMPT_FETCH_RECRUITERS_FAILED,
                payload: err
            });
        })
}
