import { Applications } from "../../shared/models/applications.model";
import { FETCH_APPLICATIONS_SUCCESS, FETCHING_APPLICATIONS, FETCH_APPLICATIONS_FAILED, SET_APPLICATIONS_FILTER_OPTIONS  } from "./action-types";
import { LOADING, LOADED, FAILED } from "../constants";

const initialState = {
    data: new Applications(),
    status: LOADED,
    options: {
        current: 0,
        FilterOptions: {}
    },
}

function applicationsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_APPLICATIONS_FILTER_OPTIONS: {
            return {
                ...state,
                options: {
                    FilterOptions: {
                        ViewType: action.payload.ViewType,
                        ViewValue: action.payload.ViewValue
                    }
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
        default:
            return state;
    }
}

export default applicationsReducer
