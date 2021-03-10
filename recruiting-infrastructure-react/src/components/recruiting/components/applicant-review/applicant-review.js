import React, { useState } from "react";
import Popup from 'reactjs-popup';
import './applicant-review.scss';
import ApplicantTable from '../applicant-table'

export const ApplicantReview = ({ onSubmit }) => {
    const [status, setStatus] = useState("")

    const handleChange = e => {
        setStatus(e.target.value)
    }

    return (
        <Popup trigger={<button className="button"> Open Applicant Profile </button>} modal>
            {close => (
                <div className="applicant-review">
                    <div className="header"> Applicant Review </div>
                    <div className="information">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label> How would you rank this applicant? </label>
                                <input className="form-control" id="ranking" />
                            </div>
                            <div className="form-group">
                                <label> Notes on the application </label>
                                <input className="form-control" id="notes" />
                            </div>
                            <div className="form-group">
                                <label> What should the status of this application be? </label>
                                <select value={status} onChange={handleChange}>
                                    <option selected value="blank"> </option>
                                    <option value="read"> Read </option>
                                    <option value="accepted"> Accepted </option>
                                    <option value="interview"> Asked for Interview </option>
                                    <option value="interviewed"> Interviewed </option>
                                    <option value="rejected"> Rejected </option>
                                </select>
                            </div>
                            {(status == "rejected") && (
                                <div className="form-group">
                                    <label> Why do you want to reject this applicant? </label>
                                    <input className="form-control" id="rejection" />
                                </div>
                            )}
                            {(status !== "blank") && (status !== "rejected") && (
                            <div className="form-group">
                                <label> Potential Pairing </label>
                                <input className="form-control" id="pairing" />
                                <label> Potential Position </label>
                                <input className="form-control" id="position" />
                                <label> Talent Pool </label>
                                <input className="form-control" id="talent-pool" />
                            </div>
                          )}
                            <div className="form-group">
                                <button className="submit btn btn-primary" type="submit">
                                Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="popup-close">
                        <button className="button" onClick={() => {
                            console.log('popup closed');
                            close();
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
};
