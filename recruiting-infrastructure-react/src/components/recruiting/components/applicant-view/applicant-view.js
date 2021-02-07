import React, { useState } from "react";
import './applicant-view.scss';
import Select from 'react-select';
import Icon from 'static/search-icon.png'
import ApplicantTable from '../applicant-table';
import { customStyles } from './customStyles';

export const ApplicantView = () => {
    return (
        <div className="applicant-container">
            <h3>General Talent Pool</h3>
            <div className="query-container">
                <div className="dropdown-container">
                    <div className="dropdown">
                        <Select
                            options={[]}
                            placeholder={"Filter By"}
                            styles={customStyles} />
                    </div>
                    <div className="dropdown">
                        <Select
                            options={[]}
                            placeholder={"Sort By"}
                            styles={customStyles} />
                    </div>
                </div>
                <div className="search-bar-container">
                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder="search keywords or skills"
                            autoComplete="off"></input>
                    </div>
                    <div className="icon-container">
                        <img className="search-icon" src={Icon} alt="Search" />
                    </div>
                </div>
            </div>
            <div className="pool-container">
                <ApplicantTable />
            </div>
        </div>
    )
};