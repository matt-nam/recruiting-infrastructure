import { LOADING, LOADED, FAILED } from "./status-types";

export const getApplicationsState = store => store.applications;

export const getApplicationsStatus = store =>
    getApplicationsState(store) ? getApplicationsState(store).status : FAILED;

export const getApplicationById = (store, id) =>
    getApplicationsState(store) ? { ...getApplicationsState(store).byIds[id], id } : {};

export const getCurrentApplication = (store) =>
    getApplicationsState(store) ? getApplicationById(store, getApplicationsState(store).current) : {};

// TODO: IMPLEMENT
export const getApplicationsByOptions = (store) => {};