import { FETCHING_EMAIL, FETCH_EMAIL, FETCH_EMAIL_FAILED, SET_EMAIL, SEND_EMAIL_FAILED, SEND_EMAIL } from "./action-types";
import client from "../api"

export const fetchEmail = (email_type) => {
    return function (dispatch, getState)
    {
        dispatch({ type: FETCHING_EMAIL })
        const student = getState().applications.data.posWithId(getState().applications.options.current)
        var body = {
            "requestContext": {
                "recruiter": getState().user.user.email,
                "type": email_type,
                "student": student.FirstName
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

    // client.get('main-app', '/recruiter', body)
    //     .then(r => {
    //         dispatch({
    //             type: FETCH_EMAIL,
    //             payload: r
    //         });
    //     })
    //     .catch(err => {
    //         console.error(err); // log since might be a render err
    //         dispatch({
    //             type: FETCH_EMAIL_FAILED,
    //             payload: err
    //         });
    //     })
}

export const editEmail = (newEmail) => {
    return function (dispatch) {
        dispatch({
            type: SET_EMAIL,
            payload: newEmail
        })
    }
}

export const sendEmail = (newEmail, applicantId) => {
    var body = {
        "email_body": newEmail,
        "email_subject": "YES Internship Program <> Interview",
        "recruiter_email": "andrew.milas@yale.edu",
        "type": "interviewTemplate"
    }

    var requestContext = {
        "requestContext": {
            "identity": {
                "cognitoIdentityId": applicantId
            }
        }
    }
    return function (dispatch) {
        client.post('main-app', '/emailInterview', body, requestContext)
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