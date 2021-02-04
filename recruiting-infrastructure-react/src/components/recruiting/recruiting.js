import React, { useState } from "react";
import "./recruiting.scss";
import Select from 'react-select';
import Sidebar from './components/sidebar';
import Icon from 'static/search-icon.png'
import { customStyles } from './customStyles';

// import Dropdown from "../catalog/components/dropdown";
// import arrow from "../../images/arrow.svg";

export const Recruiting = () => {
    // Sample data for testing
    const companies = ["Aureline","BlueSpace.ai, Inc.", "Branch", "Bright Building", "Brutus Broth", "Buzr", "Cherish", "Dexi", "DICOM Director"];
    const talentPools = ["SWE","Data Science", "Marketing", "Design"];

    return (
        <React.Fragment>
            <div className="recruiting-container">
                <Sidebar companies={companies} talentPools={talentPools} />
                <div className="applicant-container">
                    <h3>General Talent Pool</h3>
                    <div className="query-container">
                        <div className="dropdown-container">
                            <div className="dropdown">
                                <Select
                                    options = {[]}
                                    placeholder={"Filter By"}
                                    styles={customStyles} />
                            </div>
                            <div className="dropdown">
                                <Select
                                    options = {[]}
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
                        <table>
                            <tr>
                                <th>name</th>
                                <th className="rating-header">rating</th>
                                <th>status</th>
                                <th>school</th>
                                <th>major</th>
                                <th>time commitment</th>
                            </tr>
                            <tr>
                                <td>Matthew Nam</td>
                                <td><div className="rating">1</div></td>
                                <td><div className="status">interviewing</div></td>
                                <td>Yale</td>
                                <td>Computer Science</td>
                                <td>5-10 hours/week</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}