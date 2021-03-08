import { LOADING, LOADED, FAILED } from "../constants";
import { FilterOptions } from "shared/models/filterOptions.model";
import { ApplicationList } from "shared/models/applicationList.model";

export const getApplicationsState = store => store.applications;

export const getApplicationsStatus = store =>
    getApplicationsState(store) ? getApplicationsState(store).status : FAILED;

export const getCurrentApplicationId = store => getApplicationsState(store) ? getApplicationsState(store).options.current : "";

export const getCurrentApplication = store => getApplicationsState(store) ? getApplicationsState(store).data.posWithId(getCurrentApplicationId(store)) : {};

export const getShowingModal = store => getApplicationsState(store) ? getApplicationsState(store).showingModal : false;

// TODO: Implement Other Selectors
export const getApplicationListFiltered = store =>
    getApplicationsState(store) ? getApplicationsState(store).data.filtered(getApplicationFilterOptions(store)) : new ApplicationList();
    // store ? getApplicationsState(store).data.sorted(getApplicationFilterOptions()) : new ApplicationList();

export const getApplicationFilterOptions = store =>
    getApplicationsState(store) ? getApplicationsState(store).options.FilterOptions : new FilterOptions();

export const getUniversities = store => getApplicationsState(store) ? getApplicationsState(store).data.universities : [];
export const getOrganizations = store => getApplicationsState(store) ? getApplicationsState(store).data.organizations : [];
export const getMajors = store => getApplicationsState(store) ? getApplicationsState(store).data.majors : [];
export const getYears = store => getApplicationsState(store) ? getApplicationsState(store).data.years : [];
export const getTimeCommitments = store => getApplicationsState(store) ? getApplicationsState(store).data.timeCommitments : [];
export const getTalentPools = store => getApplicationsState(store) ? getApplicationsState(store).data.talentPools : [];

