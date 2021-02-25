import React, { useState } from "react";
import './applicant-view.scss';

import Icon from 'static/search-icon.png'
import ApplicantTable from '../applicant-table';
import { customStyles } from './customStyles';
import { useDispatch, useSelector } from "react-redux";
import {
    getApplicationFilterOptions,
    getUniversities,
    getOrganizations,
    getMajors,
    getYears,
    getTimeCommitments,
    getIndustries
} from 'services/applications/selectors';
import { getStartupsState } from 'services/startups/selectors';
import FilterView from '../filter-view'
import { VIEW_COMPANY, VIEW_TALENT_POOL, VIEW_ACCEPTED, VIEW_REJECTED, VIEW_ALL_APPLICANTS } from 'services/constants';

export const ApplicantView = () => {
    const dispatch = useDispatch();
    const filterOptions = useSelector(state => getApplicationFilterOptions(state));
    const [showFilterOptions, setShowFilterOptions] = useState(false);

    function renderTitle() {
        switch (filterOptions.ViewType) {
            case VIEW_COMPANY:
                return filterOptions.ViewValue.name + " Rankings";
            case VIEW_TALENT_POOL:
                if (filterOptions.ViewValue === "") {
                    return "General Talent Pool";
                } else {
                    return filterOptions.ViewValue + " Talent Pool";
                }
            case VIEW_ACCEPTED:
                return "Acceptance Pool";
            case VIEW_REJECTED:
                return "Rejected Pool";
            case VIEW_ALL_APPLICANTS:
                return "General Applicant Pool";
            default:
                return "Nothing selected";
        }
    }

    // mock data for displaying properties
    const displayProperties = ["FirstName", "LastName", "Rating", "University", "Major", "Hours"];

    const universities = useSelector(state => getUniversities(state))
    const organizations = useSelector(state => getOrganizations(state))
    const majors = useSelector(state => getMajors(state))
    const years = useSelector(state => getYears(state))
    const timeCommitments = useSelector(state => getTimeCommitments(state))
    const industries = useSelector(state => getIndustries(state))
    const companies = useSelector(state => getStartupsState(state)).data.models;

    return (
        <div className="applicant-container">
            <h3>{renderTitle()}</h3>
            <div className="query-container">
                <div className="dropdown-container">
                    <div className="dropdown">
                        <button className="filter-btn" onClick = {() => setShowFilterOptions(!showFilterOptions)}>Filter</button>
                    </div>
                </div>
                <div className="search-bar-container">
                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder="search keywords or skills"
                            autoComplete="off"></input>
                    </div>
                    <div className="icon-container">
                        <img className="search-icon" src={Icon} alt="Search" />
                    </div>
                </div>
            </div>
            <div className="pool-container">
                <ApplicantTable displayProperties={displayProperties} />
            </div>
            <div className={"cover" + (showFilterOptions ? "": " hide")} onClick={() => setShowFilterOptions(!showFilterOptions)}></div>
            <div className="filter-container" style={{width: (showFilterOptions ? "30%" : "0px"), padding: (showFilterOptions ? "2%" : "0px")}}>
                <div className="filter-container-row">
                    <h4>Filter Options</h4>
                    <button className="filter-btn" onClick = {() => setShowFilterOptions(!showFilterOptions)}>Close</button>
                </div>
                
                <FilterView
                    university={universities}
                    organization={organizations}
                    major={majors}
                    year={years}
                    timeCommitment={timeCommitments}
                    industry={industries}
                    companies={companies}
                />
            </div>
            
            
        </div>
    )
};