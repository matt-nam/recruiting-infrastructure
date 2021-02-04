import { Model } from "./base";

import {
    FounderList, 
    Position, 
    PositionList, 
    SkillsList, 
    StartupInfo,
} from "shared/models"

export class CatalogPosition extends Model {
    defaults() {
        return {
            Positions: new PositionList(),
            Founders: new FounderList(),
            StartupInfo: new StartupInfo(),
        };
    }
}

export const catalogPositionFactory = (startup, data) => {
    var positions = (data.filter(pos => pos.StartupInfo.StartupId === startup.StartupInfo.StartupId)).map(startup => startup.Position)
    return new CatalogPosition({
        Founders: new FounderList(startup.Founders),
        Positions: new PositionList(positions.map(position => new Position({
            ...position,
            Title: position.Title + " Intern",
            TimeCommitment: getTimeCommitment(position.TimeCommitment),
            TimeCommitmentVal: position.TimeCommitment,
            Skills: new SkillsList(position.Skills)
        }))),
        StartupInfo: new StartupInfo({
            ...startup.StartupInfo,
            Paid: getPaid(startup.StartupInfo.Paid),
            PaidInfo: startup.StartupInfo.Paid
        })
    })
}

export const filterCatalogPositionWithOpt = (opt, startup) => {
    if (opt.KeywordSearch && opt.KeywordSearch != "") {
        let search = opt.KeywordSearch.trim().toLowerCase()
        if (!startup.StartupInfo.StartupName.toLowerCase().includes(search)) {
            return false
        }
    }
    if (opt.IndustrySearch.length > 0 && opt.IndustrySearch[0] != "") {
        if (!startup.StartupInfo.Industries.some(industry => opt.IndustrySearch.includes(industry.trim()))) {
            return false
        }
    }
    if (opt.Funding.length > 0) {
        if (!opt.Funding.includes(startup.StartupInfo.Funding.trim())) {
            return false
        }
    }
    if (opt.Paid != "") {
        if (opt.Paid != startup.StartupInfo.Paid) {
            return false
        }
    }
    return true
}

export const compareCatalogPosition = (a, b) => {
    if (a.StartupInfo.StartupName < b.StartupInfo.StartupName) {
        return -1;
    }
    if (a.StartupInfo.StartupName > b.StartupInfo.StartupName) {
        return 1;
    }
    return 0;
}

function getTimeCommitment(tc) {
    if (tc[0] === 40 && tc[1] === 40) return "Full-time"
    return "" + tc[0] + "-" + tc[1] + " hours/week"
}

function getPaid(opt) {
    if (opt.trim() === "Unpaid" || opt.trim() === "No") return "Unpaid"
    return "Paid"
}

