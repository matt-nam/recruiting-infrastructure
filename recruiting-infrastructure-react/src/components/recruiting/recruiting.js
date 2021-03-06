import React, { useState } from "react";
import "./recruiting.scss";
import Sidebar from './components/sidebar';
import ApplicantView from './components/applicant-view';
import { getStartupsState } from 'services/startups/selectors';
import { getTalentPools } from 'services/applications/selectors';
import { useDispatch, useSelector } from "react-redux";

// Mock data for companies and talent pools
// import { companies, talentPools } from './mockData';

export const Recruiting = () => {
    const companies = useSelector(state => getStartupsState(state)).data.models;
    const talentPools = useSelector(state => getTalentPools(state));
    return (
        <div className="recruiting-container-flex">
            <div className="recruiting-container">
                <Sidebar companies={companies} talentPools={talentPools} />
                <ApplicantView />
            </div>
            </div>
    )
}