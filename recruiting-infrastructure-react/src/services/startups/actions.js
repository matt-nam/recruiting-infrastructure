import {
    FETCH_STARTUPS_SUCCESS,
    FETCHING_STARTUPS,
    FETCH_STARTUPS_FAILED,
} from "./action-types";
import client from "../api"
// import mockData from "../../shared/models/tests/mockStartups.js"
import { catalogFactory } from "../../shared/models/catalog.model.js";

// TODO: CHANGE CLIENT ENDPOINT

// will need to include something involving batch size later on
export const fetchStartups = (dispatch) => {
    dispatch({ type: FETCHING_STARTUPS })
    // var res = catalogFactory(mockData.data)
    // dispatch({
    //     type: FETCH_STARTUPS_SUCCESS,
    //     payload: res
    // })
    client.get('main-app', '/catalog')
        .then(r => {
            let res = catalogFactory(r)
            console.log(res)
            dispatch({
                type: FETCH_STARTUPS_SUCCESS,
                payload: res
            })
        })
        .catch(err => {
            console.error(err); // log since might be a render err
            dispatch({
                type: FETCH_STARTUPS_FAILED,
                payload: err
            });
        })
}


