import React, { useState } from "react";
import './applicant-table.scss';

export const ApplicantTable = () => {
    return (
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
    )
};