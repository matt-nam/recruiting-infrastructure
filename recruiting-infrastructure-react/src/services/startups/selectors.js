import { LOADING, LOADED, FAILED } from "../constants";

export const getStartupsState = store => store.startups;

export const getStartupsStatus = store =>
    getStartupsState(store) ? getStartupsState(store).status : FAILED;

export const getStartupData = store => getStartupsState(store) ? getStartupsState(store).data : {};
export const getIndustries = store => getStartupsState(store) ? getStartupsState(store).industries : [];
export const getStartups = store => getStartupsState(store) ? getStartupsState(store).data.startups : [];
export const getPotentialPositions = (store, ids) => getStartupsState(store) ? getStartupsState(store).data.getPositionsFor(ids) : [];