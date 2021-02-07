import React, { useState } from "react";
import "./recruiting.scss";
import Sidebar from './components/sidebar';
import ApplicantView from './components/applicant-view';

// Mock data for companies and talent pools
import { companies, talentPools } from './mockData';

export const Recruiting = () => {
    return (
        <React.Fragment>
            <div className="recruiting-container">
                <Sidebar companies={companies} talentPools={talentPools} />
                <ApplicantView />
            </div>
        </React.Fragment>
    )
}