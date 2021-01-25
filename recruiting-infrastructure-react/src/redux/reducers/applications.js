import { Applications } from "../../shared/models/applications.model";
import { FETCH_APPLICATIONS, FETCHING_APPLICATIONS, FETCH_APPLICATIONS_FAILED, VIEW_APPLICATIONS, SET_OPTIONS } from "../action-types";
import { LOADING, LOADED, FAILED } from "../status-types";

const initialState = {
    data: new Applications(),
    status: LOADED,
    options: 1, // place holder
    current: 0,
    indices: [],

    // ids and byIds are deprecated
    ids: [0, 1],
    byIds: { // using mock data to develop front-end
        0: {},
        1: {}
    },
}

function applicationsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_OPTIONS: {
            return {
                ...state,
                options: action.payload,
            };
        }
        case FETCHING_APPLICATIONS: {
            return {
                ...state,
                status: LOADING,
            }
        }
        case FETCH_APPLICATIONS: {
            return {
                ...state,
                data: action.payload,
                indices: action.payload.indices,
                status: LOADED,
            };
        }
        case FETCH_APPLICATIONS_FAILED: {
            return {
                ...state,
                status: FAILED,
            }
        }
        case VIEW_APPLICATIONS: {
            const { id } = action.payload
            return {
                ...state,
                current: id,
            }
        }
        default:
            return state;
    }
}

export default applicationsReducer
