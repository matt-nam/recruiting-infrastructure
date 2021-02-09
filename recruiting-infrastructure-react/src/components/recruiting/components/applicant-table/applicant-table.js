import React, { useState } from "react";
import './applicant-table.scss';

// Mock data for applications
import mockData from 'shared/models/tests/mock';

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
    let applications = mockData.data;
    
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