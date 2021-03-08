import { FETCHING_EMAIL, FETCH_EMAIL, FETCH_EMAIL_FAILED, SET_EMAIL, SEND_EMAIL_FAILED, SEND_EMAIL } from "./action-types";
import client from "../api"

export const fetchEmail = (dispatch) => {
    dispatch({ type: FETCHING_EMAIL })
    var body = {
        "requestContext": {
            "recruiter": "andrew.milas@yale.edu",
            "type": "interviewTemplate",
            "student": "Rosie" // correct input?
        }
    }

    client.get('main-app', '/recruiter', body)
        .then(r => {
            dispatch({
                type: FETCH_EMAIL,
                payload: r
            });
        })
        .catch(err => {
            console.error(err); // log since might be a render err
            dispatch({
                type: FETCH_EMAIL_FAILED,
                payload: err
            });
        })
}

export const editEmail = (newEmail) => {
    return function (dispatch) {
        dispatch({
            type: SET_EMAIL,
            payload: newEmail
        })
    }
}

export const sendEmail = (newEmail) => {
    var body = {
        "body": {
            "email_body": newEmail,
            "email_subject": "YES Internship Program <> Interview",
            "recruiter_email": "andrew.milas@yale.edu",
            "type": "interviewTemplate"
        },
        "requestContext": {
            "identity": {
                "cognitoIdentityId": "us-east-2:e55be1ed-23d0-4027-aefe-80728e44269f" // what ID?
            }
        }
    }
    return function (dispatch) {
        client.post('main-app', '/emailInterview', body)
        .then(r => {
            dispatch({
                type: SEND_EMAIL,
                payload: r
            })
        })
        .catch(err => {
            console.error(err); // log since might be a render err
            dispatch({
                type: SEND_EMAIL_FAILED,
                payload: err
            });
        })
    }
}