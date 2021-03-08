import React, { useState } from "react";
import Input from "./components/input";
import Number from "./components/number"
import Select from "./components/select";
import MultiSelect from "./components/multiselect"
import { useDispatch, useSelector } from "react-redux";
import { getStartups, getPotentialPositions, getStartupData } from 'services/startups/selectors'
import { getRecruiterNotes } from 'shared/models/recruiterNotes.model'
import { getTalentPools } from 'services/applications/selectors'
import { Form, FormGroup } from 'react-bootstrap'

import "./review-view.scss"

export const ReviewView = ({ currentApplication, formData }) => {

    const dispatch = useDispatch()

    const [recruiterNotes, setRecruiterNotes] = useState({ ...currentApplication.RecruiterNotes })
    const startupData = useSelector(state => getStartupData(state))
    const startups = useSelector(state => getStartups(state))
    const positions = useSelector(state => getPotentialPositions(state, recruiterNotes.NewStartupPairing))
    const talentpools = useSelector(state => getTalentPools(state)).map(tp => { return { Name: tp, Id: tp } })
    var email = "1"

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(recruiterNotes)
    };

    const updateApplicationNotes = (keyValue, value) => {
        var res = recruiterNotes
        res[keyValue] = value
        setRecruiterNotes({
            ...res
        })
    }

    const updateRecruiterNotes = (keyValue, value) => {
        var notes = recruiterNotes[keyValue]
        const index = notes.findIndex(notes => notes.RecruiterEmail == email)
        const d = new Date();
        const n = d.getTime();
        if (index === -1) {
            notes.push({
                Notes: value,
                RecruiterEmail: email,
                CreatedAt: n,
            })
        } else {
            notes[index].Notes = value
            notes[index].CreatedAt = n
        }
        var res = recruiterNotes
        res[keyValue] = notes
        setRecruiterNotes({
            ...res
        })
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
            case "multiselect": return recruiterNotes[name]
            case "startups": return startups.filter(startup => recruiterNotes[name].includes(startup.Id))
            case "positions": return positions.filter(position => recruiterNotes[name].includes(position.Id))
            case "talentpools": return talentpools.filter(talentpool => recruiterNotes[name].includes(talentpool.Id))
            case "recruiter": return getRecruiterNotes(recruiterNotes, name, emailValue)
            default: return ""
        }
    }

    const getMultiSelectOptions = (multiValueType) => {
        switch (multiValueType) {
            case "startups": return startups
            case "positions": return positions
            case "talentpools": return talentpools
            default: return []
        }
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
            case "input":
                return (
                    <React.Fragment>
                        {field.valueType == "recruiter" ?
                            recruiterNotes[field.name].map((notes, index) => <p key={index}>{notes.RecruiterEmail}: {notes.Notes}</p>) : <></>}
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
                    <Number
                        keyValue={field.name}
                        field={field}
                        fieldChanged={getChangedFunction(field.inputType)}
                        values={getCurrentValue(field.valueType, field.name)}
                        classProp={field.class}
                    />
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
                <p className={"rounded-info " + (currentApplication.RecruiterNotes.StartupPreferences[index] ? "" : "rounded-info-rejected")} key={name + index}>{name}</p>
            )}
        </div>);
    }

    return (
        <div className="review-view-container">
            <h3>General Info</h3>
            <p>Skills: {currentApplication.Skills}</p>
            <h5>Applicant's Start-up Preferences</h5>
            {renderStartupPreferences()}
            <Form onSubmit={handleSubmit}>
                {formData.fields.map((field, index) =>
                    <FormGroup key={index} controlId={field.name}>
                        {getFormInput(field)}
                    </FormGroup>
                )}
                <input type="submit" />
            </Form>
        </div>
    );
};

export default ReviewView;
