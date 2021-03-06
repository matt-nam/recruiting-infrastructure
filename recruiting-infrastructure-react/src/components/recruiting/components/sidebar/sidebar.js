import React, { useState } from "react";
import OptionSelector from '../option-selector'
import refreshIcon from "../../images/refresh-icon.svg";
import { setApplicationsFilterOptions } from 'services/applications/actions';
import { getApplicationFilterOptions } from 'services/applications/selectors';
import { useDispatch, useSelector } from "react-redux";
import { VIEW_ALL_APPLICANTS, VIEW_ACCEPTED, VIEW_REJECTED } from 'services/constants';
import './sidebar.scss';

export const Sidebar = ({ companies, talentPools }) => {
    const dispatch = useDispatch();
    const filterOptions = useSelector(state => getApplicationFilterOptions(state));

    function changeApplicantView(key) {
        dispatch(setApplicationsFilterOptions({ viewType: key, viewValue: "" }));
    }

    return (
        <div className="recruiting-sidebar">
            <div className="recruiting-content">
                <div className="filler"></div>
                <div className="sidebar-item">
                    <OptionSelector title="companies" items={companies} />
                </div>
                <div className="sidebar-item">
                    — applicant pool
                <ul>
                        <li><span className={filterOptions.ViewType === VIEW_ALL_APPLICANTS ? "active clickable" : "clickable"} onClick={() => changeApplicantView(VIEW_ALL_APPLICANTS)}>all applicants</span></li>
                        <li>
                            <OptionSelector title="talent pool" items={talentPools} />
                        </li>
                    </ul>
                </div>
                <div className={"sidebar-item clickable " + (filterOptions.ViewType === VIEW_ACCEPTED ? "active" : "")} onClick={() => changeApplicantView(VIEW_ACCEPTED)}>
                    acceptance pool
                    </div>
                <div className={"sidebar-item clickable " + (filterOptions.ViewType === VIEW_REJECTED ? "active" : "")} onClick={() => changeApplicantView(VIEW_REJECTED)}>
                    rejected pool
                    </div>
                <div className="larger-filler"></div>
                <button className="refresh-btn"><img src={refreshIcon} alt="refresh" /></button>
            </div>
        </div>
    )
};