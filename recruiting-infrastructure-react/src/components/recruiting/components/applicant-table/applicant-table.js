import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import './applicant-table.scss';
import { useDispatch } from "react-redux";
import { getApplicationListFiltered, getApplicationFilterOptions } from 'services/applications/selectors';
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
            // return app[prop] + " hours/week";
            if (app[prop][0] == 40 && app[prop][1] == 40) {
                return "Fulltime";
            }
            return app[prop][0] + "-" + app[prop][1] + " hours/week";
        case "Rating":
            return "" + app["RecruiterNotes"][prop];
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
    const defaultAscendingToggle = { currentProp: filterOptions.SortValue, asc: filterOptions.Ascending };
    const [ascendingToggle, setAscendingToggle] = useState(defaultAscendingToggle);

    function sortApplications(prop) {
        var newAsc = true;
        console.log(prop);
        if (ascendingToggle.currentProp === prop) {
            newAsc = !ascendingToggle.asc;
        }
        const newAscendingToggle = { currentProp: prop, asc: newAsc };

        console.log(newAscendingToggle);
        setAscendingToggle(newAscendingToggle);
        dispatch(setApplicationsSortOptions({ sortValue: prop, ascending: newAsc }));
    }

    const resizeListener = () => {
        tbodyRef.current.style.height = (divRef.current.offsetHeight - theadRef.current.offsetHeight - 2) + 'px';
    };

    useEffect(() => {
        tbodyRef.current.style.height = (divRef.current.offsetHeight - theadRef.current.offsetHeight - 2) + 'px';
        
        window.addEventListener('resize', resizeListener);
        return () => {
            tbodyRef.current.style.height = (divRef.current.offsetHeight - theadRef.current.offsetHeight - 2) + 'px';
            window.removeEventListener('resize', resizeListener);
        }
    }, [viewValue]);

    return (
        <div ref={divRef} className="table-responsive">
            <table className="table applicant-table table-fixed">
                <thead ref={theadRef}>
                    <tr>
                        {displayProperties.map((prop) => (
                            <th key={prop} className={prop === "Rating" ? "rating-header col-xs-2" : "col-xs-2"} ><span onClick={() => sortApplications(prop)}>{`${(prop in renderHeader) ? renderHeader[prop] : prop.toLowerCase()} ` + `${ascendingToggle.currentProp !== prop ? "\u2B0D" : (ascendingToggle.asc ? "\u25B2" : "\u25BC")}`}</span></th>
                        ))}
                    </tr>
                </thead>
                <tbody ref={tbodyRef}>
                    {applications.map((app, index) => (
                        <tr key={index}>
                            {displayProperties.map((prop) => (
                                <td key={prop + ("_" + index)} className="col-xs-2"> <div className={(prop in renderClassName) ? renderClassName[prop] : ""}>{renderTableRow(app, prop)}</div></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};