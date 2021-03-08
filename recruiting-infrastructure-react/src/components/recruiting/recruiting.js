import React, { useState } from "react";
import "./recruiting.scss";
import Sidebar from 'components/applicant-view/components/sidebar';
import ApplicantView from 'components/applicant-view';
import ApplicantReview from "components/applicant-review"
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getStartupsState } from 'services/startups/selectors';
import { useAppContext } from "utils/contextLib";
import { getTalentPools, getApplicationsStatus } from 'services/applications/selectors';
import { useUser } from "shared/hooks";
import { useSelector } from "react-redux";
import { LOADED } from "services/constants";

// Mock data for companies and talent pools
// import { companies, talentPools } from './mockData';

export const Recruiting = () => {
    const history = useHistory();
    const { isAuthenticated, userHasAuthenticated } = useAppContext();
    const companies = useSelector(state => getStartupsState(state)).data.models;
    const talentPools = useSelector(state => getTalentPools(state));
    const status = useSelector(state => getApplicationsStatus(state))
    let { user } = useUser();

    return (
        <React.Fragment>
            { user.userHasAuthenticated || isAuthenticated ? <div className="recruiting-container-flex">
                <div className="recruiting-container">
                    {status == LOADED ?
                        <React.Fragment>
                            <Sidebar companies={companies} talentPools={talentPools} />
                            <ApplicantView />
                            <ApplicantReview />
                        </React.Fragment>
                        : <></>}
                </div>
            </div> : <div className="login-message">
                <h2>Not logged in!</h2>
                <Button onClick={() => history.push("/")}>Back to home page</Button>
            </div>
            }
        </React.Fragment>
    )
}
