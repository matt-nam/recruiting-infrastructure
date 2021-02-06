import {
    SET_OPTIONS,
    FETCH_APPLICATIONS,
    FETCHING_APPLICATIONS,
    FETCH_APPLICATIONS_FAILED,
    VIEW_APPLICATIONS
} from "./action-types";
import client from "../services/api"
import { applicationsFactory } from "../shared/models/applications.model";

// TODO: CHANGE CLIENT ENDPOINT

// will need to include something involving batch size later on
export const fetchApplications = (dispatch, getState) => {
    dispatch({ type: FETCHING_APPLICATIONS })
    client.get('catalog', '/catalog')
        .then(r => {
            let res = applicationsFactory(r)
            dispatch({
                type: FETCH_APPLICATIONS,
                payload: res
            })
        })
        .catch(err => {
            console.error(err); // log since might be a render err
            dispatch({
                type: FETCH_APPLICATIONS_FAILED,
                payload: err
            });
        })
}

export const viewApplications = (id) => ({
    type: VIEW_APPLICATIONS,
    payload: { id }
})

// need to implement options action
export const setOptions = options => ({ type: SET_OPTIONS, payload: { options } });
