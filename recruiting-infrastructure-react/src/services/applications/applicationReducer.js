import { ApplicationList, applicationsFactory } from "../../shared/models/applicationList.model";
import { FilterOptions } from "../../shared/models/filterOptions.model";
import {
    SET_TABLE_FILTER_OPTIONS,
    FETCH_APPLICATIONS_SUCCESS,
    FETCHING_APPLICATIONS,
    FETCH_APPLICATIONS_FAILED,
    SET_APPLICATIONS_FILTER_OPTIONS,
    SET_CURRENT_APPLICATION,
    SET_APPLICATIONS_SORT_OPTIONS,
    SUBMITTING_NOTES,
    SUBMIT_NOTES_SUCCESS,
    SUBMIT_NOTES_FAILED,
    SET_SHOWING_MODAL,
} from "./action-types";
import { LOADING, LOADED, FAILED } from "../constants";
import { loadState, saveState } from "services/api";

const initialState = {
    data: new ApplicationList(),
    status: LOADED,
    showingModal: false,
    options: {
        current: 0,
        FilterOptions: new FilterOptions()
    },
}

function applicationsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_APPLICATIONS_FILTER_OPTIONS: {
            return {
                ...state,
                options: {
                    ...state.options,
                    FilterOptions: new FilterOptions({
                        ...state.options.FilterOptions,
                        ViewType: action.payload.ViewType,
                        ViewValue: action.payload.ViewValue
                    })
                },
            };
        }
        case SET_TABLE_FILTER_OPTIONS: {
            let newFilterOptions = new FilterOptions({ ...state.options.FilterOptions })
            newFilterOptions[action.payload.Option] = action.payload.Value
            saveState('filterOptions', {
                Hours: newFilterOptions.Hours,
                Industry: newFilterOptions.Industry,
                International: newFilterOptions.International,
                Major: newFilterOptions.Major,
                Organization: newFilterOptions.Organization,
                Rank1: newFilterOptions.Rank1,
                Rank2: newFilterOptions.Rank2,
                Rank3: newFilterOptions.Rank3,
                University: newFilterOptions.University,
                Year: newFilterOptions.Year
            })
            return {
                ...state,
                options: {
                    ...state.options,
                    FilterOptions: newFilterOptions
                }
            };
        }
        case SET_APPLICATIONS_SORT_OPTIONS: {
            let newFilterOptions = new FilterOptions({
                ...state.options.FilterOptions,
                SortValue: action.payload.SortValue,
                Ascending: action.payload.Ascending
            });
            saveState('sortOptions', {
                Ascending: newFilterOptions.Ascending,
                SortValue: newFilterOptions.SortValue
            })
            const sortedApplications = applicationsFactory(state.data.sorted(newFilterOptions));
            return {
                ...state,
                data: sortedApplications,
                options: {
                    ...state.options,
                    FilterOptions: newFilterOptions
                }
            }
        }
        case FETCHING_APPLICATIONS: {
            return {
                ...state,
                status: LOADING,
            }
        }
        case FETCH_APPLICATIONS_SUCCESS: {
            let currentSortOptions = loadState('sortOptions');
            let currentFilterOptions = loadState('filterOptions');
            let currentApplicationId = loadState('currentApplication');
            let newOptions = { ...state.options }
            let newFilterOptions = newOptions.FilterOptions;
            var apps;
            if (currentSortOptions) {
                apps = applicationsFactory(action.payload.sorted(currentSortOptions));
                newFilterOptions.Ascending = currentSortOptions.Ascending;
                newFilterOptions.SortValue = currentSortOptions.SortValue;
            } else {
                apps = action.payload;
            }
            if (currentFilterOptions) {
                newFilterOptions.Hours = currentFilterOptions.Hours;
                newFilterOptions.Industry = currentFilterOptions.Industry;
                newFilterOptions.International = currentFilterOptions.International;
                newFilterOptions.Major = currentFilterOptions.Major;
                newFilterOptions.Organization = currentFilterOptions.Organization;
                newFilterOptions.Rank1 = currentFilterOptions.Rank1;
                newFilterOptions.Rank2 = currentFilterOptions.Rank2;
                newFilterOptions.Rank3 = currentFilterOptions.Rank3;
                newFilterOptions.University = currentFilterOptions.University;
                newFilterOptions.Year = currentFilterOptions.Year;
            }
            if (currentApplicationId) {
                newOptions.current = currentApplicationId;
            }
            let new_state = {
                data: apps,
                status: LOADED,
                options: newOptions
            };

            return new_state;
        }
        case FETCH_APPLICATIONS_FAILED: {
            return {
                ...state,
                status: FAILED,
            }
        }
        case SET_CURRENT_APPLICATION: {
            saveState('currentApplication', action.payload.ApplicationId);
            return {
                ...state,
                options: {
                    ...state.options,
                    current: action.payload.ApplicationId
                }
            }
        }
        case SET_SHOWING_MODAL: {
            return {
                ...state,
                showingModal: action.payload.showingModal
            }
        }
        case SUBMITTING_NOTES: {
            return {
                ...state,
                status: LOADING,
            }
        }
        case SUBMIT_NOTES_SUCCESS: {
            var newApplications = new ApplicationList()
            newApplications.models = [...state.data.models]
            newApplications.models[action.payload.index].RecruiterNotes = action.payload.res
            return {
                ...state,
                data: newApplications,
                status: LOADED
            }
        }
        case SUBMIT_NOTES_FAILED: {
            return {
                ...state,
                status: FAILED,
            }
        }
        default:
            return state;
    }
}

export default applicationsReducer
