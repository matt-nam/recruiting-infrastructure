import { LOADING, LOADED, FAILED } from "../constants";
import { FilterOptions } from "shared/models/filterOptions.model";
import { ApplicationList } from "shared/models/applicationList.model";

export const getApplicationsState = store => store.applications;

export const getApplicationsStatus = store =>
    getApplicationsState(store) ? getApplicationsState(store).status : FAILED;

// TODO: Implement Other Selectors
export const getApplicationListFiltered = store =>
    getApplicationsState(store) ? getApplicationsState(store).data.sorted(getApplicationFilterOptions(store)) : new ApplicationList();
    // store ? getApplicationsState(store).data.sorted(getApplicationFilterOptions()) : new ApplicationList();

export const getApplicationFilterOptions = store =>
    getApplicationsState(store) ? getApplicationsState(store).options.FilterOptions : new FilterOptions();