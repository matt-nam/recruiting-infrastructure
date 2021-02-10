import { List } from "./base";
import { ApplicationPosition } from "./applicationPosition.model";
import { RecruiterNotes } from "./recruiterNotes.model";
import { VIEW_COMPANY, VIEW_TALENT_POOL } from 'services/constants';

// TODO: complete model defaults
export class ApplicationList extends List {
    get model() {
        return ApplicationPosition
    }

    get indices() {
        return this.models.map(pos => pos.Index)
    }

    posAt(index) {
        return this.models.find(pos => pos.Index === index)
    }

    sorted(opt) {
        // Filters each application by not including if it does not include
        // a filtering property
        let applications = new ApplicationList(this.models.filter(application => {
            switch (opt.ViewType) {
                case VIEW_TALENT_POOL: {
                    return application.RecruiterNotes.TalentPools.includes(opt.ViewValue)
                }
                case VIEW_COMPANY: {
                    return true
                }
                default:
                    return true;
            }
        }))
        return applications
    }
}

export const applicationsFactory = (res) => {
    let idCounter = 0
    return new ApplicationList(res.map((listing) => {
        return new ApplicationPosition({
            RecruiterNotes: new RecruiterNotes(listing.RecruiterNotes),
            Index: idCounter++,
            ...listing
        })
    }))
}
