import React, { useState } from "react";
import './applicant-view.scss';
import Select from 'react-select';
import Icon from 'static/search-icon.png'
import ApplicantTable from '../applicant-table';
import { customStyles } from './customStyles';
import { useDispatch, useSelector } from "react-redux";
import { getApplicationFilterOptions } from 'services/applications/selectors';
import { VIEW_COMPANY, VIEW_TALENT_POOL, VIEW_ACCEPTED, VIEW_REJECTED, VIEW_ALL_APPLICANTS } from 'services/constants';

export const ApplicantView = () => {
    const dispatch = useDispatch();
    const filterOptions = useSelector(state => getApplicationFilterOptions(state));

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

    return (
        <div className="applicant-container">
            <h3>{renderTitle()}</h3>
            <div className="query-container">
                <div className="dropdown-container">
                    <div className="dropdown">
                        <Select
                            options={[]}
                            placeholder={"Filter By"}
                            styles={customStyles} />
                    </div>
                    <div className="dropdown">
                        <Select
                            options={[]}
                            placeholder={"Sort By"}
                            styles={customStyles} />
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
                <ApplicantTable displayProperties={displayProperties}/>
            </div>
        </div>
    )
};