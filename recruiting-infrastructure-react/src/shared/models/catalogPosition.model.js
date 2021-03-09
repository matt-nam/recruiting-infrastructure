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
        id: startup.StartupInfo.StartupId,
        name: startup.StartupInfo.StartupName,
        Founders: new FounderList(startup.Founders),
        Positions: new PositionList(positions.map(position => new Position({
            ...position,
            Title: position.Title + " Intern",
            TimeCommitment: getTimeCommitment(position.TimeCommitment),
            TimeCommitmentVal: position.TimeCommitment,
            Skills: new SkillsList(position.Skills),
            Paid: getPaid(position.Paid),
            PaidInfo: position.Paid
        }))),
        StartupInfo: new StartupInfo({
            ...startup.StartupInfo,
            Paid: getPaid(startup.StartupInfo.Paid),
            PaidInfo: startup.StartupInfo.Paid,
        })
    })
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
    return "" + tc[0] + "-" + tc[1] + " hrs/week"
}

function getPaid(opt) {
    if (opt && (opt.trim() === "Unpaid" || opt.trim() === "No")) return "Unpaid"
    else if (opt && opt === "") return ""
    else if (!opt) return ""
    return "Paid"
}

