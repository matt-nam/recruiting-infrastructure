import React, { useState } from "react";
import "./recruiting.scss";
import Sidebar from './components/sidebar';
import ApplicantView from './components/applicant-view';
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getStartupsState } from 'services/startups/selectors';
import { useAppContext } from "utils/contextLib";
import { getTalentPools } from 'services/applications/selectors';
import { useUser } from "shared/hooks";
import { useDispatch, useSelector } from "react-redux";

// Mock data for companies and talent pools
// import { companies, talentPools } from './mockData';

export const Recruiting = () => {
    const history = useHistory();
    const { isAuthenticated, userHasAuthenticated } = useAppContext();
    const companies = useSelector(state => getStartupsState(state)).data.models;
    const talentPools = useSelector(state => getTalentPools(state));
    let { user } = useUser();

    return (
        <React.Fragment>
            { user.userHasAuthenticated || isAuthenticated ? <div className="recruiting-container-flex">
                <div className="recruiting-container">
                    <Sidebar companies={companies} talentPools={talentPools} />
                    <ApplicantView />
                </div>
            </div> : <div className="login-message">
                <h2>Not logged in!</h2>
                <Button onClick={() => history.push("/")}>Back to home page</Button>
                </div>
        }
        </React.Fragment>
    )
}
