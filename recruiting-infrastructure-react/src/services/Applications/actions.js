import {
    SET_APPLICATIONS_FILTER_OPTIONS,
    FETCH_APPLICATIONS_SUCCESS,
    FETCHING_APPLICATIONS,
    FETCH_APPLICATIONS_FAILED,
    SET_CURRENT_APPLICATION,
    SET_APPLICATIONS_SORT_OPTIONS,
    SET_TABLE_FILTER_OPTIONS
} from "./action-types";
// import client from "../api"
import { applicationsFactory } from "../../shared/models/applicationList.model";
// import mockData from "../../shared/models/tests/mockApplications.js";
import mockData from "../../shared/models/tests/mockApplicationsLarge.js";

// TODO: CHANGE CLIENT ENDPOINT

// will need to include something involving batch size later on
export const fetchApplications = (dispatch) => {
    dispatch({ type: FETCHING_APPLICATIONS })
    var res = applicationsFactory(mockData.data);

    console.log(res)

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
export const setApplicationsFilterOptions = options => ({ type: SET_APPLICATIONS_FILTER_OPTIONS, payload: { ViewType: options.viewType, ViewValue: options.viewValue } });

export const setCurrentApplication = options => ({ type: SET_CURRENT_APPLICATION, payload: { ApplicationId: options.applicationId } });

export const setApplicationsSortOptions = options => ({type: SET_APPLICATIONS_SORT_OPTIONS, payload: { SortValue: options.sortValue, Ascending: options.ascending }});

export const setTableFilterOptions = options => ({
    type: SET_TABLE_FILTER_OPTIONS,
    payload: { ...options }
});
