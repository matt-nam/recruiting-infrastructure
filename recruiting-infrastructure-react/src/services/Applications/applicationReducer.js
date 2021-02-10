import { ApplicationList } from "../../shared/models/applicationList.model";
import { FilterOptions } from "../../shared/models/filterOptions.model";
import { FETCH_APPLICATIONS_SUCCESS, FETCHING_APPLICATIONS, FETCH_APPLICATIONS_FAILED, SET_APPLICATIONS_FILTER_OPTIONS, SET_CURRENT_APPLICATION } from "./action-types";
import { LOADING, LOADED, FAILED } from "../constants";

const initialState = {
    data: new ApplicationList(),
    status: LOADED,
    options: {
        current: 0,
        FilterOptions: new FilterOptions
    },
}

function applicationsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_APPLICATIONS_FILTER_OPTIONS: {
            return {
                ...state,
                options: {
                    ...state.options,
                    FilterOptions: new FilterOptions({
                        ViewType: action.payload.ViewType,
                        ViewValue: action.payload.ViewValue
                    })
                },
            };
        }
        case FETCHING_APPLICATIONS: {
            return {
                ...state,
                status: LOADING,
            }
        }
        case FETCH_APPLICATIONS_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                status: LOADED,
            };
        }
        case FETCH_APPLICATIONS_FAILED: {
            return {
                ...state,
                status: FAILED,
            }
        }
        case SET_CURRENT_APPLICATION: {
            return {
                ...state,
                options: {
                    ...state.options,
                    current: action.payload.ApplicationId
                }
            }
        }
        default:
            return state;
    }
}

export default applicationsReducer
