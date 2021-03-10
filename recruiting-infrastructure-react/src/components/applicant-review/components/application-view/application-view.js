import React from "react";
import { getStartupsState } from 'services/startups/selectors';
import { useSelector } from "react-redux";
import './application-view.scss';
import { valid } from "chroma-js";

function isString(myVar) {
    return typeof myVar === 'string' || myVar instanceof String;
}

export const ApplicationView = (prop) => {
    let app = prop.currentApplication;
    let startupModels = useSelector(state => getStartupsState(state)).data.models;

    let excluded = [
        "RecruiterNotes",
        "Email",
        "Round",
        "PhoneNumber",
        "ApplicationId",
        "CreatedAt",
        "International",
        "InternationalLocation",
        "Authorization",
        "AuthorizationType",
        "Major",
        "University",
        "StudentLocation",
        "Index",
        "Organization",
        "sk",
        "Rank1",
        "Rank2",
        "Rank3",
        "pk",
        "Resume",
        "LinkedIn",
        "Year",
        "FirstName",
        "LastName",
        "Gender",
        "Ethnicity",
        "Disability",
        "Hours",
        "Acknowledgement"
    ];

    // const valid_google_drive_link = new RegExp('https:\\/\\/drive\\.google\\.com\\/open\\?id=([^/]+)')

    const getApplicationSections = (attr) => {
        switch (attr[0]) {
            case "Startups":
                if (attr[1].length > 0) {
                    const numStartups = attr[1].length;
                    let ranks = new Array(numStartups * 3);
                    startupModels.forEach(startup => {
                        for (var i = 0; i < numStartups; i++) {
                            if (startup.StartupInfo.StartupId === attr[1][i]) {
                                ranks[3 * i] = (<p className="str-label question">{startup.StartupInfo.StartupName}</p>);
                                ranks[3 * i + 2] = (<p className="str-label-2 response">{app["Rank" + (i + 1)]}</p>)
                            }
                        }
                    })
                    return (
                        <React.Fragment>
                            <p className="section-title">Startup Rankings <span className="red">*</span></p>
                            {ranks}
                        </React.Fragment>
                    )
                }
                return <></>;
            case "Responses":
                if (attr[1].length > 0) {
                    // const numQuestions = attr[1].length;
                    // let ranks = new Array(numQuestions);
                    return (
                        <React.Fragment>
                            <p className="section-title">Required Responses <span className="red">*</span></p>
                            {attr[1].map((obj, index) => (
                                <span key={index}>
                                    <p className="str-label question" key={`1 ${index}`}>{obj.Question}</p>
                                    <p className="str-label-2 response" key={`2 ${index}`}>{obj.Response}</p>
                                </span>
                            ))}
                        </React.Fragment>
                    )
                }
                return <></>;

            // case "Resume":
            // https://drive.google.com/file/d/1pCTfpv9Pnu4wBoWna03tDbNoDJPCWIup/view

            // https://drive.google.com/file/d/1W9TI81OTVjl-OQJ8YKQQE5DA0sM7qUcN/view
            // https://drive.google.com/file/d/1W9TI81OTVjl-OQJ8YKQQE5DA0sM7qUcN/view
            // let fileId = valid_google_drive_link.exec(attr[1])[1]
            // if (valid_google_drive_link.test(attr[1])) {
            //     return (
            //         <React.Fragment>
            //             <p>{attr[0].replace(/([a-z0-9])([A-Z])/g, '$1 $2')}</p>
            //             <iframe src={"https://drive.google.com/file/d/"+fileId+"/preview?usp=sharing"} width="100%" height="480"></iframe>
            //         </React.Fragment>
            //     );
            // }
            // return <></>;
            // case "Video":
            // case "AdditionalFile":
            // if (valid_google_drive_link.test(attr[1])) {
            //     return (
            //         <React.Fragment>
            //             <p>{attr[0].replace(/([a-z0-9])([A-Z])/g, '$1 $2')}</p>
            //             <iframe src={attr[1] + "/preview"} width="100%" height="480"></iframe>
            //         </React.Fragment>
            //     );
            // }
            // return <></>;
            default:
                if (!excluded.includes(attr[0]) && !(isString(attr[1]) && attr[1].length === 0)) {
                    if (typeof attr[1] === "boolean") {
                        return (<p>{attr[0].replace(/([a-z0-9])([A-Z])/g, '$1 $2')}: {attr[1] ? "Yes" : "No"}</p>);
                    }
                    else if (isString(attr[1])) {
                        return (
                            <React.Fragment>
                                <p className="section-title">{
                                    attr[0] === "LinkedIn" ? attr[0] : (
                                        attr[0] === "Aspirations" ? "Where do you see yourself in the near future?" : (
                                            attr[0] === "AdditionalInfo" ? "Anything else you would like us to know?" : (
                                                attr[0] === "AdditionalFile" ? "Anything else you would like us to see?" : (
                                                    attr[0].replace(/([a-z0-9])([A-Z])/g, '$1 $2'))
                                            )))
                                }</p>
                                <p className="str-label response">{attr[1]}</p>
                            </React.Fragment>
                        )
                    }
                    else if (Array.isArray(attr[1]) && isString(attr[1][0])) {
                        return (
                            <React.Fragment>
                                <p className="section-title">{attr[0].replace(/([a-z0-9])([A-Z])/g, '$1 $2')}</p>
                                { attr[1].map((str, index) => <p key={index} className="str-label response-list">• {str}</p>)}
                            </React.Fragment>
                        );
                    }
                    else if (!isNaN(attr[1])) {
                        return (<p>{attr[0] === "ApplicationId" ? "Application ID" : attr[0].replace(/([a-z0-9])([A-Z])/g, '$1 $2')}: {attr[1]}</p>);
                    }
                }
        }
        return <></>
    }

    return (
        <div className="application-view">
            <h3>{app.FirstName} {app.LastName} ({app.Email.toLowerCase()})</h3>

            { Object.entries(app).sort(function (attr1, attr2) {
                if (app.priority[attr1[0]] < app.priority[attr2[0]]) {
                    return -1;
                }
                if (app.priority[attr1[0]] > app.priority[attr2[0]]) {
                    return 1;
                }
                return 0;
            }).map((attr, index) => <div key={index}>
                {getApplicationSections(attr)}
            </div>)}
        </div>
    );
};

export default ApplicationView;
