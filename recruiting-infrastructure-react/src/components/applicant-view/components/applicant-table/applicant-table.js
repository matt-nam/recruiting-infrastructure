import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import './applicant-table.scss';
import { useDispatch } from "react-redux";
import chroma from 'chroma-js';
import { getApplicationListFiltered, getApplicationFilterOptions } from 'services/applications/selectors';
import { getStartupsState } from 'services/startups/selectors';
import { setApplicationsSortOptions,setCurrentApplication, setShowingModal } from 'services/applications/actions';

export const ratingColormap = chroma
    .scale(['#f8696b', '#ffeb84', '#63b37b'])
    .domain([1, 5]);

const renderHeader = {
    "FirstName": "First name",
    "LastName": "Last name",
    "Hours": "Time Commitment",
    "StartupPairing": "Startup Pairing",
    "Startups": "Startup Rankings"
}

const renderClassName = {
    "Rating": "rating",
    "Status": "status"
}

function renderTableRow(app, prop, startupModels) {
    if (!(prop in app || prop in app["RecruiterNotes"])) {
        return "";
    }
    switch (prop) {
        case "Hours":
            return app[prop]
        case "Status":
            return "" + app["RecruiterNotes"][prop][0].Status
        case "Rating":
            return app["RecruiterNotes"][prop] === "" ? "-" : "" + app["RecruiterNotes"][prop];
        case "StartupPairing":
            var unsorted_names = [];
            startupModels.forEach(startup => {
                if (app["RecruiterNotes"][prop].includes(startup.StartupInfo.StartupId)) {
                    unsorted_names.push(startup.StartupInfo.StartupName);
                }
            });
            var names = unsorted_names.sort();
            return (<div className="rounded-info-container">
                {names.map((name, index) =>
                    <p className="rounded-info" key={name + index}>{name}</p>
                )}
            </div>)
        case "Startups":
            const numStartups = app[prop].length;
            var names = Array(numStartups);
            startupModels.forEach(startup => {
                for (var i = 0; i < numStartups; i++) {
                    if (startup.StartupInfo.StartupId === app[prop][i]) {
                        names[i] = startup.StartupInfo.StartupName;
                    }
                }
            });
            return (<div className="rounded-info-container">
                {names.map((name, index) =>
                    <p className={"rounded-info " + (app["RecruiterNotes"]["StartupPreferences"][index] ? "" : "rounded-info-rejected")} key={name + index}>{name}</p>
                )}
            </div>);
        default:
            return app[prop];
    }
}

export const ApplicantTable = ({ displayProperties, viewValue }) => {
    const dispatch = useDispatch();

    const divRef = useRef();
    const theadRef = useRef();
    const tbodyRef = useRef();

    let applications = useSelector(state => getApplicationListFiltered(state)).models;
    let filterOptions = useSelector(state => getApplicationFilterOptions(state));
    let startupModels = useSelector(state => getStartupsState(state)).data.models;

    const defaultAscendingToggle = { currentProp: filterOptions.SortValue, asc: filterOptions.Ascending };
    const [ascendingToggle, setAscendingToggle] = useState(defaultAscendingToggle);

    const handleRowClick = (app) => {
        dispatch(setCurrentApplication({applicationId: app.ApplicationId}))
        dispatch(setShowingModal({showingModal: true}))
    }

    function sortApplications(prop) {
        var newAsc = true;
        if (ascendingToggle.currentProp === prop) {
            newAsc = !ascendingToggle.asc;
        }
        const newAscendingToggle = { currentProp: prop, asc: newAsc };
        setAscendingToggle(newAscendingToggle);
        dispatch(setApplicationsSortOptions({ sortValue: prop, ascending: newAsc }));
    }

    const resizeListener = () => {
        tbodyRef.current.style.height = (divRef.current.offsetHeight - theadRef.current.offsetHeight - 2) + 'px';
    };

    useEffect(() => {
        if (tbodyRef.current && divRef.current && theadRef.current) {
            tbodyRef.current.style.height = (divRef.current.offsetHeight - theadRef.current.offsetHeight - 2) + 'px';

            window.addEventListener('resize', resizeListener);
        }
        return () => {
            if (tbodyRef.current && divRef.current && theadRef.current) {
                tbodyRef.current.style.height = (divRef.current.offsetHeight - theadRef.current.offsetHeight - 2) + 'px';
                window.removeEventListener('resize', resizeListener);
            }
        }
    }, [viewValue]);

    return (
        <div ref={divRef} className="table-responsive">
            <table className="applicant-table table-fixed">
                <thead ref={theadRef}>
                    <tr>
                        {displayProperties.map((prop) => (
                            <th key={prop} className={(prop === "Startups" || prop === "StartupPairing" ? "col-xs-" : "col-xs-") + (prop === "Rating" ? " rating-header" : "")} >
                                <span onClick={() => sortApplications(prop)}>{`${(prop in renderHeader) ? renderHeader[prop] : prop} ` + `${ascendingToggle.currentProp !== prop ? "\u2B0D" : (ascendingToggle.asc ? "\u25B2" : "\u25BC")}`}</span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody ref={tbodyRef}>
                    {applications.map((app, index) => (
                        <tr key={index} onClick={() => handleRowClick(app)}>
                            {displayProperties.map((prop) => (
                                <td key={prop + ("_" + index)} className={prop === "Startups" || prop === "StartupPairing" ? "col-xs-" : "col-xs-"}>
                                    <div
                                        className={(prop in renderClassName) ? renderClassName[prop] : ""}
                                        style={prop === "Rating" && app["RecruiterNotes"][prop] !== "" ? {
                                            backgroundColor: ratingColormap(app["RecruiterNotes"][prop]),
                                            color: ratingColormap(app["RecruiterNotes"][prop]).darken(4)
                                        } : {}}>
                                        {renderTableRow(app, prop, startupModels)}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};
