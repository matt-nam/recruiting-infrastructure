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
}

export const catalogFactory = (data) => {
    let ids = unique(data.map(pos => pos.StartupInfo.StartupId))
    let startups = ids.map(id => data.find(pos => pos.StartupInfo.StartupId === id))
    var ret = startups.map(startup => catalogPositionFactory(startup, data))
    return new Catalog(ret.sort(compareCatalogPosition))
}
