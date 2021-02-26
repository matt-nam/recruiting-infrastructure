import React, { useState } from 'react';
import "./listing.scss";
import pay from "./images/pay.svg";
import time from "./images/time.svg";
import team_size from "./images/team_size.svg";
import duration from "./images/duration.svg";
import open_pos from "./images/open_pos.svg";
import bookmark from "./images/bookmark.svg";
import link from "./images/link.svg";
import linkedin from "./images/linkedin.svg";
// import BottomSlider from "shared/components/bottom-slider";

/**
 * The detailed listing for the chosen position
 * @param {obj} listing
 */

export const Listing = ({ listing }) => {

    if (!listing) {
        return (
            <div className="no-listing-container">
                <h3 className="no-listing">welcome! click on an internship position on the left scrollbar to learn more.</h3>
            </div>
        )
    } else {
        const industries = listing.StartupInfo.Industries.join(', ')

        const listingDetails = [
        //     { icon: time, suffix: "", alt: "time", value: listing.Position.TimeCommitment },
        //     { icon: open_pos, suffix: "available position(s)", alt: "positions", value: listing.Position.MaxInterns },
        //     { icon: team_size, suffix: "employee(s)", alt: "size", value: listing.Position.TeamSize },
            { icon: pay, suffix: "", alt: "pay", value: listing.StartupInfo.Paid },
        //     { icon: duration, suffix: "", alt: "duration", value: listing.Position.TimePeriod }
        ]

        const infoDetails = [
        //     { title: "Projects", values: listing.Position.Projects.split('\n') },
        //     { title: "Project Skill Level", values: listing.Position.Skills.models.map(skill => skill.Skill + ": " + skill.Level) },
        //     { title: "Desired Skillsets", values: listing.Position.Qualifications.split('\n') },
            { title: "Intern Benefits", values: listing.StartupInfo.Benefits.split('\n') },
            { title: "Intern here if you're interested in", values: listing.StartupInfo.Interests.split('\n') },
        ]

        return (
            <div className="listing-container">
                <div className="title-container">
                    <div>
                        <div className="startup-name-container">
                            <h1>{listing.StartupInfo.StartupName}</h1>
                            <a href={listing.StartupInfo.Website} target="_blank" rel="noreferrer noopener" className="learn-more"><img src={link} alt="link" className="button-icon" /></a>
                        </div>
                        {/* <p className="title">{listing.Position.Title}</p> */}
                        <p className="industry">{listing.StartupInfo.Funding} | {industries}</p>
                    </div>
                    <img src={listing.StartupInfo.LogoLink} alt="img" className="logo" />
                </div>
                <div>
                    {listing.Founders.models.map((founder, index) =>
                        <div key={index} className="founder">
                            <span>{founder.Name}</span>
                            <a target="_blank" rel="noreferrer noopener" href={founder.LinkedIn} className="button-icon">
                                <img src={linkedin} alt="linkedin" />
                            </a>
                        </div>
                    )}
                </div>

                <div className="listing-details">
                    <hr />
                    {listingDetails.map((detail, index) =>
                        <div className="listing-detail" key={index}>
                            <img src={detail.icon} alt={detail.alt} className="icon" />
                            <p>{detail.value} {detail.suffix}</p>
                        </div>
                    )}
                    <hr />
                </div>

                <div>
                    <p className="text">{listing.StartupInfo.Blurb}</p>
                </div>

                {infoDetails.map((infoDetail, detailIndex) => {
                    if (infoDetail.values.length === 0) {
                        return <span key={detailIndex} />
                    }
                    else {
                        return (
                            <div key={detailIndex}>
                                <h2 className="info-heading">{infoDetail.title}</h2>
                                <ul>
                                    {infoDetail.values.map((detail, index) =>
                                        <div key={index}>
                                            <li>{detail}</li>
                                        </div>
                                    )}
                                </ul>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
};
