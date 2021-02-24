import React, { useState } from "react";
import Select from 'react-select';
import Dropdown from '../dropdown'
import './filter-view.scss';
/*<Select
                            options = {[]}
                            placeholder = {"University"}
                            styles = {customStyles}
                        />*/

// ["University", "Organization", "Major", "Year", "International", "Hours", "Industry", "Rank1", "Rank2", "Rank3"];
export const FilterView = ({university, organization, major, year, timeCommitment, industry, companies}) => {
    return (
        <React.Fragment>
            <Dropdown title = "University" items = {university} filterName="University"/>
            <Dropdown title = "Organization" items = {organization} filterName="Organization"/>
            <Dropdown title = "Major" items = {major} filterName="Major"/>
            <Dropdown title = "Year" items = {year} filterName="Year"/>
            <Dropdown title = "International" items = {["Yes","No"]} filterName="International"/>
            <Dropdown title = "Time Commitment" items = {timeCommitment} filterName="TimeCommitment"/>
            <Dropdown title = "Industry" items = {industry} filterName="Industry"/>

            <Dropdown title = "Ranked First" items = {companies} filterName="Rank1"/>
            <Dropdown title = "Ranked Second" items = {companies} filterName="Rank2"/>
            <Dropdown title = "Ranked Third" items = {companies} filterName="Rank3"/>
        </React.Fragment>
    )
};