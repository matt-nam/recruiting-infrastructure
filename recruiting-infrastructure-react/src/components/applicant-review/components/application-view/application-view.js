import React from "react";
import { getStartupsState } from 'services/startups/selectors';
import { useSelector } from "react-redux";
import './application-view.scss';

function isString(myVar) {
    return typeof myVar === 'string' || myVar instanceof String;
}

export const ApplicationView = (prop) => {
    let app = prop.currentApplication;
    let startupModels = useSelector(state => getStartupsState(state)).data.models;
    let excluded = ["RecruiterNotes", "Index", "sk", "Rank1", "Rank2", "Rank3", "pk", "FirstName", "LastName"];

    return (
        <div className="application-view">
            <h3>{app.FirstName} {app.LastName}</h3>

            { Object.entries(app).sort(function (attr1, attr2) {
                if (app.priority[attr1[0]] < app.priority[attr2[0]]) {
                    return -1;
                }
                if (app.priority[attr1[0]] > app.priority[attr2[0]]) {
                    return 1;
                }
                return 0;
            }).map(attr => {
                switch (attr[0]) {
                    case "Startups":
                        if (attr[1].length > 0) {
                            const numStartups = attr[1].length;
                            let ranks = new Array(numStartups * 3);
                            startupModels.forEach(startup => {
                                for (var i = 0; i < numStartups; i++) {
                                    if (startup.StartupInfo.StartupId === attr[1][i]) {
                                        ranks[3 * i] = (<p className="str-label">#{i + 1}: {startup.StartupInfo.StartupName}</p>);
                                        ranks[3 * i + 1] = (<p className="str-label">Why are you interested in {startup.StartupInfo.StartupName}?</p>);
                                        ranks[3 * i + 2] = (<p className="str-label-2">{app["Rank" + (i + 1)]}</p>)
                                    }
                                }
                            })
                            return (
                                <React.Fragment>
                                    <p>Startup Rankings</p>
                                    {ranks}
                                </React.Fragment>
                            )
                        }
                        return null;
                    case "Responses":
                        if (attr[1].length > 0) {
                            // const numQuestions = attr[1].length;
                            // let ranks = new Array(numQuestions);
                            return (
                                <React.Fragment>
                                    <p>Responses</p>
                                    {attr[1].map(obj => (<React.Fragment>
                                        <p className="str-label">{obj.Question}</p>
                                        <p className="str-label-2">{obj.Response}</p>
                                    </React.Fragment>))}
                                </React.Fragment>
                            )
                        }
                        return null;
                    default:
                        if (!excluded.includes(attr[0]) && !(isString(attr[1]) && attr[1].length === 0)) {
                            if (typeof attr[1] === "boolean") {
                                return (<p>{attr[0].replace(/([a-z0-9])([A-Z])/g, '$1 $2')}: {attr[1] ? "Yes" : "No"}</p>);
                            }
                            else if (isString(attr[1])) {
                                return (
                                    <React.Fragment>
                                        <p>{
                                            attr[0] === "LinkedIn" ? attr[0] : (
                                                attr[0] === "Aspirations" ? "Where do you see yourself in the near future?" : (
                                                    attr[0] === "AdditionalInfo" ? "Anything else you would like us to know?" : (
                                                        attr[0] === "AdditionalFile" ? "Anything else you would like us to see?" : (
                                                            attr[0].replace(/([a-z0-9])([A-Z])/g, '$1 $2'))
                                                    )))
                                        }</p>
                                        <p className="str-label">{attr[1]}</p>
                                    </React.Fragment>
                                )
                            }
                            else if (Array.isArray(attr[1]) && isString(attr[1][0])) {
                                return (
                                    <React.Fragment>
                                        <p>{attr[0].replace(/([a-z0-9])([A-Z])/g, '$1 $2')}</p>
                                        { attr[1].map(str => (<p className="str-label">{str}</p>))}
                                    </React.Fragment>
                                );
                            }
                            else if (!isNaN(attr[1])) {
                                return (<p>{attr[0] === "ApplicationId" ? "Application ID" : attr[0].replace(/([a-z0-9])([A-Z])/g, '$1 $2')}: {attr[1]}</p>);
                            }
                        }
                }
            })}
        </div>
    );
};

export default ApplicationView;
