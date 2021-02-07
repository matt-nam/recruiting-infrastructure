import React, { useState } from "react";
import './applicant-table.scss';

// Mock data for applications
import { applications } from './mockData';

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
            return ""+app["RecruiterNotes"][prop];
        default:
            return app[prop];
    }
}

export const ApplicantTable = ({ displayProperties }) => {
    return (
        <table>
            <tr>
                {displayProperties.map((prop) => (
                    <th className={prop === "Rating" ? "rating-header" : ""}>{(prop in renderHeader) ? renderHeader[prop] : prop.toLowerCase() }</th>
                ))}
            </tr>

            {applications.map((app) => (
                <tr>
                    {displayProperties.map((prop) => (
                        <td> <div className={ (prop in renderClassName) ? renderClassName[prop] : "" }>{ renderTableRow(app, prop) }</div></td>
                    ))}
                </tr>
            ))}

        </table>
    )
};