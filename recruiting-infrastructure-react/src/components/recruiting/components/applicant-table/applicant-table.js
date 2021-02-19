import React, { useState } from "react";
import { useSelector } from "react-redux";
import './applicant-table.scss';
import { useDispatch } from "react-redux";
import { getApplicationListFiltered } from 'services/applications/selectors';
import { setApplicationsSortOptions } from 'services/applications/actions';

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
    const dispatch = useDispatch();
    const defaultAscendingToggle = { currentProp: "", asc: true };
    const [ascendingToggle, setAscendingToggle] = useState(defaultAscendingToggle);
    let applications = useSelector(state => getApplicationListFiltered(state)).models;

    function sortApplications(prop) {
        var newAsc = true;
        console.log(prop);
        if (ascendingToggle.currentProp === prop) {
            newAsc = !ascendingToggle.asc;
        }
        const newAscendingToggle = { currentProp: prop, asc: newAsc };

        console.log(newAscendingToggle);
        setAscendingToggle(newAscendingToggle);
        dispatch(setApplicationsSortOptions({sortValue: prop, ascending: newAsc}));
    }
    
    return (
        <table>
            <thead>
                <tr>
                    {displayProperties.map((prop) => (
                        <th key={prop} className={prop === "Rating" ? "rating-header" : ""} ><span onClick={() => sortApplications(prop)}>{`${(prop in renderHeader) ? renderHeader[prop] : prop.toLowerCase()} `+`${ascendingToggle.currentProp !== prop ? "\u2B0D" : (ascendingToggle.asc ? "\u25B2" : "\u25BC")}`}</span></th>
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