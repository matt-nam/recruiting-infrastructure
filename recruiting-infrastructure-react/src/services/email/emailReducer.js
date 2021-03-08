import { SET_EMAIL, FETCH_EMAIL, FETCHING_EMAIL, FETCH_EMAIL_FAILED, SEND_EMAIL, SEND_EMAIL_FAILED } from "./action-types";
import { LOADING, LOADED, FAILED } from "../constants";

const initialState = {
    email: "",
    status: LOADED,
}

function emailReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EMAIL: {
            let new_email = { ...state.email }
            new_email[action.payload.Option] = action.payload.Value
            return {
                ...state,
                email: new_email,
            };
        }
        case FETCHING_EMAIL: {
            console.log("fetching email");
            return {
                ...state,
                status: LOADING,
            }
        }
        case FETCH_EMAIL: {
            return {
                ...state,
                email: action.payload,
                status: LOADED,
            };
        }
        case FETCH_EMAIL_FAILED: {
            return {
                ...state,
                status: FAILED,
            }
        }
        case SEND_EMAIL: {
            return {
                ...state,
                status: LOADED,
            }
        }
        case SEND_EMAIL_FAILED: {
            return {
                ...state,
                status: FAILED,
            }
        }        default:
            return state;
    }
}

export default emailReducer 
