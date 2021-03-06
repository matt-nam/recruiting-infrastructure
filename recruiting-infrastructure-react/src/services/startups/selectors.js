import { LOADING, LOADED, FAILED } from "../constants";

export const getStartupsState = store => store.startups;

export const getStartupsStatus = store =>
    getStartupsState(store) ? getStartupsState(store).status : FAILED;
