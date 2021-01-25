import { List } from "./base";
import { ApplicationPosition } from "./applicationPosition.model";

// TODO: complete model defaults
export class Applications extends List {
    get model() {
        return ApplicationPosition
    }

    get indices() {
        return this.models.map(pos => pos.Index)
    }

    posAt(index) {
        return this.models.find(pos => pos.Index == index)
    }
}

export const applicationsFactory = (res) => {
    let idCounter = 0
    return new Applications(res.map((listing) => {
        return new ApplicationPosition({
            Index: idCounter++,
            // Founders: listing.Founders.map((founder) => {
            //     return new Founder(founder)
            // }),
            // Position: new Position({
            //     ...listing.Position,
            //     Skills: listing.Position.Skills.map((skill) => {
            //         return new Skill(skill)
            //     })
            // }),
            // StartupInfo: new StartupInfo(listing.StartupInfo)
        })
    }))
}
