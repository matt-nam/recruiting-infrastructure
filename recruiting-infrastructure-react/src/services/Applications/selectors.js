import { LOADING, LOADED, FAILED } from "../constants";

export const getApplicationsState = store => store.applications;

export const getApplicationsStatus = store =>
    getApplicationsState(store) ? getApplicationsState(store).status : FAILED;

// TODO: Implement Other Selectors
export const getApplicationListFiltered = (store) => { };

export const getApplicationFilterOptions = store =>
    getApplicationsState(store) ? getApplicationsState(store).options.FilterOptions : { ViewType: "", ViewValue: "" };