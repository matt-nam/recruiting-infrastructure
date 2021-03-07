import { ApplicationList } from "../../shared/models/applicationList.model";
import { Catalog } from "../../shared/models/";
import { FETCH_STARTUPS_SUCCESS, FETCHING_STARTUPS, FETCH_STARTUPS_FAILED } from "./action-types";
import { LOADING, LOADED, FAILED } from "../constants";

const initialState = {
    data: new Catalog(),
    industries: [],
    status: LOADED
}

function startupReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_STARTUPS: {
            return {
                ...state,
                status: LOADING,
            }
        }
        case FETCH_STARTUPS_SUCCESS: {
            var industries = action.payload.industries
            console.log(industries)
            return {
                ...state,
                data: action.payload,
                industries: industries,
                status: LOADED,
            };
        }
        case FETCH_STARTUPS_FAILED: {
            return {
                ...state,
                status: FAILED,
            }
        }
        default:
            return state;
    }
}

export default startupReducer
