import {
    SET_APPLICATIONS_FILTER_OPTIONS,
    FETCH_APPLICATIONS_SUCCESS,
    FETCHING_APPLICATIONS,
    FETCH_APPLICATIONS_FAILED,
    SET_CURRENT_APPLICATION,
    SET_APPLICATIONS_SORT_OPTIONS,
    SET_TABLE_FILTER_OPTIONS,
    SUBMITTING_NOTES,
    SUBMIT_NOTES_SUCCESS,
    SUBMIT_NOTES_FAILED
} from "./action-types";
import client from "../api"
import { applicationsFactory } from "../../shared/models/applicationList.model";
import { RecruiterNotes } from "../../shared/models/recruiterNotes.model";
// import mockData from "../../shared/models/tests/mockApplications.js";
import mockData from "../../shared/models/tests/mockApplicationsLarge.js";

// TODO: CHANGE CLIENT ENDPOINT

// will need to include something involving batch size later on
export const fetchApplications = (dispatch) => {
    dispatch({ type: FETCHING_APPLICATIONS })

    // USING MOCK DATA
    // var res = applicationsFactory(mockData.data);
    // console.log(res)
    // dispatch({
    //     type: FETCH_APPLICATIONS_SUCCESS,
    //     payload: res
    // })

    // CALLING API FOR APPLICATIONS
    client.get('main-app', '/applications')
        .then(r => {
            console.log(r)
            let res = applicationsFactory(r)
            dispatch({
                type: FETCH_APPLICATIONS_SUCCESS,
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

export const submitNotes = (index) => {
    return function (dispatch, getState) {
        dispatch({ type: SUBMITTING_NOTES })
        var recruiterNotes = getState().applications.data.models[index].RecruiterNotes

        var body = {
            // "ApplicationId": getState().applications.data.models[index].ApplicationId,
            "ApplicationId": "1",
            "RecruiterEmail": "andrew.milas@yale.edu",
            "RecruiterNotes": recruiterNotes
        }
        client.post('main-app', '/notes/submit', body)
            .then(r => {
                let res = new RecruiterNotes(r)
                console.log(res)
                dispatch({
                    type: SUBMIT_NOTES_SUCCESS,
                    payload: {index, res}
                })
            })
            .catch(err => {
                console.error(err); // log since might be a render err
                dispatch({  
                    type: SUBMIT_NOTES_FAILED,
                    payload: err
                });
            })
    }
}

// need to implement options action
export const setApplicationsFilterOptions = options => ({ type: SET_APPLICATIONS_FILTER_OPTIONS, payload: { ViewType: options.viewType, ViewValue: options.viewValue } });

export const setCurrentApplication = options => ({ type: SET_CURRENT_APPLICATION, payload: { ApplicationId: options.applicationId } });

export const setApplicationsSortOptions = options => ({type: SET_APPLICATIONS_SORT_OPTIONS, payload: { SortValue: options.sortValue, Ascending: options.ascending }});

export const setTableFilterOptions = options => ({
    type: SET_TABLE_FILTER_OPTIONS,
    payload: { ...options }
});
