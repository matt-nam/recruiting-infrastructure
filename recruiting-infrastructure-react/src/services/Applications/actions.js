import {
    SET_APPLICATIONS_FILTER_OPTIONS,
    FETCH_APPLICATIONS_SUCCESS,
    FETCHING_APPLICATIONS,
    FETCH_APPLICATIONS_FAILED,
    SET_CURRENT_APPLICATION
} from "./action-types";
// import client from "../api"
import { applicationsFactory } from "../../shared/models/applications.model";
import mockData from "../../shared/models/tests/mock.js"

// TODO: CHANGE CLIENT ENDPOINT

// will need to include something involving batch size later on
export const fetchApplications = (dispatch) => {
    dispatch({ type: FETCHING_APPLICATIONS })
    var res = mockData.data
    dispatch({
        type: FETCH_APPLICATIONS_SUCCESS,
        payload: res
    })
    // client.get('catalog', '/catalog')
    //     .then(r => {
    //         let res = applicationsFactory(r)
    //         dispatch({
    //             type: FETCH_APPLICATIONS,
    //             payload: res
    //         })
    //     })
    //     .catch(err => {
    //         console.error(err); // log since might be a render err
    //         dispatch({
    //             type: FETCH_APPLICATIONS_FAILED,
    //             payload: err
    //         });
    //     })
}

// need to implement options action
export const setApplicationsFilterOptions = options => ({ type: SET_APPLICATIONS_FILTER_OPTIONS , payload: { ViewType: options.viewType, ViewValue: options.viewValue } });

export const setCurrentApplication = options => ({ type: SET_CURRENT_APPLICATION , payload: { ApplicationId: options.applicationId}})

