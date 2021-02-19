import React, { useState } from "react";
import { useSelector } from "react-redux";
import './applicant-table.scss';
import { getApplicationListFiltered } from 'services/applications/selectors';


// Mock data for applications
import mockData from 'shared/models/tests/mockApplications';

const renderHeader = {
    "FirstName": "first name",
    "LastName": "last name",
    "Hours": "time commitment"
}

const renderClassName = {
    "Rating": "rating",
    "Status": "status"
}

function renderTableRow(app, prop) {
    if (!(prop in app || prop in app["RecruiterNotes"])) {
        return "";
    }
    switch (prop) {
        case "Hours":
            return app[prop] + " hours/week";
        case "Rating":
            return "" + app["RecruiterNotes"][prop];
        default:
            return app[prop];
    }
}

export const ApplicantTable = ({ displayProperties }) => {
    let applications = useSelector(state => getApplicationListFiltered(state)).models;
    
    return (
        <table>
            <thead>
                <tr>
                    {displayProperties.map((prop) => (
                        <th key={prop} className={prop === "Rating" ? "rating-header" : ""}>{(prop in renderHeader) ? renderHeader[prop] : prop.toLowerCase()}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {applications.map((app, index) => (
                    <tr key={index}>
                        {displayProperties.map((prop) => (
                            <td key={prop+("_"+index)}> <div className={(prop in renderClassName) ? renderClassName[prop] : ""}>{renderTableRow(app, prop)}</div></td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
};