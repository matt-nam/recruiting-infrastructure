import React, { useState } from "react";
import './applicant-table.scss';

// Mock data for applications
import { applications } from './mockData';

export const ApplicantTable = ({ displayProperties }) => {
    
    function renderHeader(prop) {
        switch (prop) {
            case "FirstName":
                return "first name";
            case "LastName":
                return "last name";
            case "Hours":
                return "time commitment";
            default:
                return prop.toLowerCase();
        }
    }
    function renderClassName(prop) {
        switch (prop) {
            case "Rating":
                return "rating";
            case "Status":
                return "status";
            default:
                return "";
        }
    }
    function renderTableRow(app, prop) {
        switch (prop) {
            case "Hours":
                return app[prop] + " hours/week";
            case "Rating":
                return ""+app["RecruiterNotes"][prop];
            default:
                return app[prop];
        }
    }

    return (
        <table>
            <tr>
                {displayProperties.map((prop) => (
                    <th className={prop === "Rating" ? "rating-header" : ""}>{renderHeader(prop)}</th>
                ))}
            </tr>

            {applications.map((app) => (
                <tr>
                    {displayProperties.map((prop) => (
                        <td> <div className={ renderClassName(prop) }>{ renderTableRow(app, prop) }</div></td>
                    ))}
                </tr>
            ))}

        </table>
    )
};