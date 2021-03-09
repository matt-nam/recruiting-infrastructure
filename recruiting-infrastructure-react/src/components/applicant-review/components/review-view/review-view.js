import React, { useState } from "react";
import Input from "./components/input";
import Number from "./components/number"
import Select from "./components/select";
import MultiSelect from "./components/multiselect"
import CreatableMultiSelect from "./components/creatable"
import { ControlLabel } from 'react-bootstrap'
import { deepEqual } from 'utils/helper'
import { useDispatch, useSelector } from "react-redux";
import { getStartups, getPotentialPositions, getStartupData } from 'services/startups/selectors'
import { getRecruiterNotes, processSubmittedRecruiterNotes } from 'shared/models/recruiterNotes.model'
import { getRecruiterName } from 'shared/models/recruiterList.model'
import { getUserEmail, getRecruiterList } from 'services/user/selectors'
import { getTalentPools, getSubmitStatus } from 'services/applications/selectors'
import { Form, FormGroup } from 'react-bootstrap'
import "./review-view.scss"
import { submitNotes, setWereChanges } from "services/applications/actions";

import international from './images/international.png'
import time from './images/time.png'
import doc from './images/doc.png'
import location from './images/location.png'
import linkedin from "components/applicant-view/components/listing/images/linkedin.svg";
import { FAILED, LOADED, LOADING } from "services/constants";
import { unique } from "utils/helper"

export const ReviewView = ({ currentApplication, formData }) => {

    const dispatch = useDispatch()

    const [recruiterNotes, setRecruiterNotes] = useState({ ...currentApplication.RecruiterNotes })
    const startupData = useSelector(state => getStartupData(state))
    const startups = useSelector(state => getStartups(state))
    const positions = useSelector(state => getPotentialPositions(state, recruiterNotes.NewStartupPairing))
    const talentpools = useSelector(state => getTalentPools(state))

    const getAllTalentPools = () => {
        var ret = unique(talentpools.concat(recruiterNotes.NewTalentPools))
        return ret.map(tp => { return { Name: tp, Id: tp } })
    }

    var email = useSelector(state => getUserEmail(state))
    var recruiterList = useSelector(state => getRecruiterList(state))

    const submitStatus = useSelector(state => getSubmitStatus(state))

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(processSubmittedRecruiterNotes(recruiterNotes))
        dispatch(submitNotes(currentApplication.Index, currentApplication.ApplicationId, email, processSubmittedRecruiterNotes(recruiterNotes)))
    };

    const updateApplicationNotes = (keyValue, value) => {
        console.log(value)
        var res = recruiterNotes
        res[keyValue] = value
        setRecruiterNotes({
            ...res
        })
        if (!deepEqual(currentApplication.RecruiterNotes, recruiterNotes)) {
            dispatch(setWereChanges(true))
        } else {
            dispatch(setWereChanges(false))
        }
    }

    const updateRecruiterNotes = (keyValue, value) => {
        var notes = [...recruiterNotes[keyValue]]
        const index = notes.findIndex(notes => notes.RecruiterEmail == email)
        if (index === -1) {
            notes.push({
                Notes: value,
                RecruiterEmail: email
            })
        } else {
            var note = { ...notes[index], Notes: value }
            notes[index] = note
        }
        var res = { ...recruiterNotes }
        res[keyValue] = notes
        setRecruiterNotes({
            ...res
        })
        if (!deepEqual(currentApplication.RecruiterNotes, recruiterNotes)) {
            dispatch(setWereChanges(true))
        } else {
            dispatch(setWereChanges(false))
        }
    }

    const setStartupPairing = (keyValue, value) => {
        updateApplicationNotes(keyValue, value)
        const newValidPositions = startupData.getPositionsFor(value)
        const validPositions = recruiterNotes.NewPositionPairing.filter(pairing => newValidPositions.some(pos => pos.Id === pairing))
        updateApplicationNotes("NewPositionPairing", validPositions)
    }

    const getChangedFunction = (inputType) => {
        switch (inputType) {
            case "regular": return (name, value) => updateApplicationNotes(name, value)
            case "startups": return (name, value) => setStartupPairing(name, value)
            case "recruiter": return (name, value) => updateRecruiterNotes(name, value)
            default: return () => { }
        }
    }

    const getCurrentValue = (valueType, name, emailValue) => {
        switch (valueType) {
            case "regular": return recruiterNotes[name]
            case "status": return (typeof (recruiterNotes[name]) != typeof ("") ? recruiterNotes[name][0]["Status"] : recruiterNotes[name])
            case "multiselect": return recruiterNotes[name]
            case "startups": return startups.filter(startup => recruiterNotes[name].includes(startup.Id))
            case "positions": return positions.filter(position => recruiterNotes[name].includes(position.Id))
            case "talentpools": return getAllTalentPools().filter(talentpool => recruiterNotes[name].includes(talentpool.Id))
            case "recruiter": return getRecruiterNotes(recruiterNotes, name, emailValue)
            default: return ""
        }
    }

    const getMultiSelectOptions = (multiValueType) => {
        switch (multiValueType) {
            case "startups": return startups
            case "positions": return positions
            case "talentpools": return getAllTalentPools()
            default: return []
        }
    }

    const getInternationalStatus = () => {
        if (currentApplication.International) {
            var ret = "International | " + currentApplication.InternationalLocation
            if (currentApplication.Authorization) {
                ret = ret + " | " + currentApplication.AuthorizationType
            }
            return ret
        }
        return "Domestic"
    }

    const getFormInput = (field) => {
        switch (field.component) {
            case "select":
                return (
                    <Select
                        keyValue={field.name}
                        field={field}
                        fieldChanged={getChangedFunction(field.inputType)}
                        values={getCurrentValue(field.valueType, field.name)}
                        classProp={field.class}
                    />
                )
            case "multiselect":
                return (
                    <MultiSelect
                        keyValue={field.name}
                        field={field}
                        fieldChanged={getChangedFunction(field.inputType)}
                        values={getCurrentValue(field.valueType, field.name)}
                        options={getMultiSelectOptions(field.multiValueType)}
                        classProp={field.class}
                    />
                )
            case "creatable":
                return (
                    <CreatableMultiSelect
                        keyValue={field.name}
                        field={field}
                        fieldChanged={getChangedFunction(field.inputType)}
                        values={getCurrentValue(field.valueType, field.name)}
                        options={getMultiSelectOptions(field.multiValueType)}
                        classProp={field.class}
                    />
                )
            case "input":
                return (
                    <React.Fragment>
                        <hr />
                        <ControlLabel>{field.label}</ControlLabel>
                        {field.valueType == "recruiter" ? (
                            <div className="recruiter-notes-container">{recruiterNotes[field.name].map((notes, index) =>
                                <span key={index}>
                                    <p key={`1 ${index}`} className="recruiter-title"><strong>{getRecruiterName(recruiterList, notes.RecruiterEmail)}: </strong></p>
                                    <p key={`2 ${index}`} className="recruiter-text">{notes.Notes}</p>
                                </span>)}
                            </div>) : <></>}
                        <Input
                            keyValue={field.name}
                            field={field}
                            fieldChanged={getChangedFunction(field.inputType)}
                            values={getCurrentValue(field.valueType, field.name, email)}
                            classProp={field.class}
                            numRow={field.numRow}
                        />
                    </React.Fragment>
                )
            case "number":
                return (
                    <React.Fragment>
                        <hr />
                        <Number
                            keyValue={field.name}
                            field={field}
                            fieldChanged={getChangedFunction(field.inputType)}
                            values={getCurrentValue(field.valueType, field.name)}
                            classProp={field.class}
                        />
                    </React.Fragment>
                )
            default:
                return <></>
        }
    }

    const renderStartupPreferences = () => {
        const numStartups = currentApplication.Startups.length;
        var names = Array(numStartups);
        startupData.models.forEach(startup => {
            for (var i = 0; i < numStartups; i++) {
                if (startup.StartupInfo.StartupId === currentApplication.Startups[i]) {
                    names[i] = startup.StartupInfo.StartupName;
                }
            }
        });
        return (<div className="rounded-info-container">
            {names.map((name, index) =>
                <p onClick={() => {
                    var res = recruiterNotes
                    res.StartupPreferences = [...res.StartupPreferences]
                    res.StartupPreferences[index] = !res.StartupPreferences[index]
                    setRecruiterNotes({
                        ...res
                    })
                    if (!deepEqual(currentApplication.RecruiterNotes, recruiterNotes)) {
                        dispatch(setWereChanges(true))
                    } else {
                        dispatch(setWereChanges(false))
                    }
                }} className={"rounded-info " + (recruiterNotes.StartupPreferences[index] ? "" : "rounded-info-rejected")} key={name + index}>{name}</p>
            )}
        </div>);
    }

    return (
        <div className="review-view-container">
            {submitStatus === LOADING ? <div className="submitting-cover"><p>Submitting...</p></div> : <></>}
            <Form onSubmit={handleSubmit}>
                <div className="review-view-header">
                    <div className="header-main">
                        <h5>
                            {currentApplication.FirstName} {currentApplication.LastName} {currentApplication.Year} | {currentApplication.University} {currentApplication.Major}
                            {currentApplication.LinkedIn !== "" ? <a href={currentApplication.LinkedIn} className="detail-icon" target="_black" rel="noreferrer noopener"><img src={linkedin} /></a> : <></>}
                        </h5>
                        <div className="regular-button"><input type="submit" /></div>
                        {submitStatus === FAILED ? <h5>Failed to submit</h5> : <></>}
                    </div>
                    <div className="header-details">
                        {currentApplication.Resume !== "" ? <a href={currentApplication.Resume} className="detail-icon" target="_black" rel="noreferrer noopener"><img src={doc} />Resume</a> : <></>}
                        <p><img src={international} />{getInternationalStatus()}</p>
                        <p><img src={time} />{currentApplication.Hours} hours</p>
                        <p><img src={location} />{currentApplication.StudentLocation}</p>
                    </div>
                    {renderStartupPreferences()}
                </div>
                <div className="review-form-container">
                    <div className="review-form">
                        <p><strong>Skills:</strong> {currentApplication.Skills}</p>
                        <p><strong>Affiliation:</strong> {currentApplication.Organization}</p>
                        <p><strong>Ideal Position:</strong> {currentApplication.IdealPosition}</p>
                        {formData.fields.map((field, index) =>
                            <FormGroup key={index} controlId={field.name}>
                                {getFormInput(field)}
                            </FormGroup>
                        )}
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default ReviewView;
