import { List } from "./base";
import {
    CatalogPosition,
    CurrentListing,
    Position,
    FounderList,
    StartupInfo
} from "shared/models"
import { catalogPositionFactory, compareCatalogPosition, filterCatalogPositionWithOpt } from "./catalogPosition.model"
import { filterPositionWithOpt, PositionList } from "./position.model"

import { unique } from "utils/helper"

export class Catalog extends List {
    get model() {
        return CatalogPosition
    }

    // Gets all industries
    get industries() {
        var ret = new Set()
        this.models.forEach(pos => {
            pos.StartupInfo.Industries.forEach(industry =>
                ret.add(industry.trim())
            )
        })
        return Array.from(ret)
    }

    // Gets all roles
    get roles() {
        let roles = this.models.map(startup => startup.Positions.models.map(pos => pos.Title))
        return unique([].concat.apply([], roles))
    }

    // Gets all Time Periods
    get timePeriods() {
        let timePeriods = this.models.map(startup => startup.Positions.models.map(pos => pos.TimePeriod))
        return unique([].concat.apply([], timePeriods))
    }

    // Gets all Startup Ids
    get ids() {
        return unique(this.models.map(pos => pos.StartupInfo.StartupId))
    }

    // Gets all Funding types
    get fundingTypes() {
        return unique(this.models.map(pos => pos.StartupInfo.Funding))
    }

    // Get all experience levels
    get experienceLevels() {
        return [
            "Experienced & Autonomous",
            "Proficient",
            "Comfortable",
            "First Year Friendly"
        ]
    }

    sorted(opt) {
        // Filters each position by not including if it does not include
        // a filtering property
        let startups = new Catalog(this.models.filter(startup => filterCatalogPositionWithOpt(opt, startup)))
        startups.models.forEach(startup => {
            startup.Positions = new PositionList(startup.Positions.models.filter(pos => filterPositionWithOpt(opt, pos)))
        })
        return startups
    }

    getListingById(startupId, positionId) {
        let startup = this.models.find(pos => pos.StartupInfo.StartupId === startupId)
        if (startup == null) return null

        this.models.forEach(catalogPosition => {
            catalogPosition.Positions.models.forEach(pos => {
                if (pos.PositionId === positionId) pos.Selected = true;
                else pos.Selected = false;
            })
        })

        let position = startup.Positions.models.find(pos => pos.PositionId === positionId)
        return new CurrentListing({
            Position: new Position(position),
            Founders: new FounderList(startup.Founders.models),
            StartupInfo: new StartupInfo(startup.StartupInfo),
        })
    }
}

export const catalogFactory = (data) => {
    let ids = unique(data.map(pos => pos.StartupInfo.StartupId))
    let startups = ids.map(id => data.find(pos => pos.StartupInfo.StartupId === id))
    var ret = startups.map(startup => catalogPositionFactory(startup, data))
    return new Catalog(ret.sort(compareCatalogPosition))
}
