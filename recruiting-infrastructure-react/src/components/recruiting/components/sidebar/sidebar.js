import React, { useState } from "react";
import OptionSelector from '../option-selector'
import refreshIcon from "../../images/refresh-icon.svg";
// import { useDispatch } from "react-redux";
import './sidebar.scss';

export const Sidebar = ({ companies, talentPools }) => {
    function changeApplicantView() {
        console.log("Dispatch action to show all applicants");
    }
    
    return (
        <div className="recruiting-sidebar">
            <div className="sidebar-item">
                <OptionSelector title="companies" items={companies} />
            </div>
            <div className="sidebar-item">
                — applicant pool
                <ul>
                    <li><span onClick={() => changeApplicantView()}>all applicants</span></li>
                    <li>
                        <OptionSelector title="talent pool" items={talentPools} />
                    </li>
                </ul>
            </div>
            <div className="sidebar-item">
                acceptance pool
                    </div>
            <div className="sidebar-item">
                rejected pool
                    </div>
            <button className="refresh-btn"><img src={refreshIcon} alt="refresh" /></button>
        </div>
    )
};