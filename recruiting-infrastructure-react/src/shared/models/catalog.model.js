import { List } from "./base";

import {
    CatalogPosition,
    CurrentListing,
    Position,
    FounderList,
    StartupInfo
} from "./"
import { catalogPositionFactory, compareCatalogPosition, filterCatalogPositionWithOpt } from "./catalogPosition.model"
import { filterPositionWithOpt, PositionList } from "./position.model"

import { unique } from "utils/helper"

export class Catalog extends List {
    get model() {
        return CatalogPosition
    }

    get industries() {
        var ret = new Set()
        this.models.forEach(pos => {
            pos.StartupInfo.Industries.forEach(industry =>
                ret.add(industry.trim())
            )
        })
        return Array.from(ret).sort()
    }

    get startups() {
        return this.models.map(pos => {
            return {
                Name: pos.StartupInfo.StartupName,
                Id: pos.StartupInfo.StartupId
            }
        })
    }

    getPositionsFor(startupIds) {
        var startups = this.models.filter(pos => startupIds.includes(pos.StartupInfo.StartupId))
        var positions = []
        startups.forEach(startup => startup.Positions.models.forEach(pos => {
            positions.push({
                Name: startup.StartupInfo.StartupName + " - " + pos.Title,
                Id: pos.PositionId
            })
        }))
        return positions
    }
}

export const catalogFactory = (data) => {
    let ids = unique(data.map(pos => pos.StartupInfo.StartupId))
    let startups = ids.map(id => data.find(pos => pos.StartupInfo.StartupId === id))
    var ret = startups.map(startup => catalogPositionFactory(startup, data))
    return new Catalog(ret.sort(compareCatalogPosition))
}
