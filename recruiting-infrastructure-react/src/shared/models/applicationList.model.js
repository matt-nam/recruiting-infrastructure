import { List } from "./base";
import { ApplicationPosition } from "./applicationPosition.model";
import { RecruiterNotes } from "./recruiterNotes.model";
import { VIEW_COMPANY, VIEW_TALENT_POOL } from 'services/constants';
import { loadState, saveState } from "services/api";

import { unique } from "utils/helper"

const timeCommitments = {
    "1-5 hrs/wk": [1,5], 
    "6-10 hrs/wk": [6, 10],
    "11-15 hrs/wk": [11, 15],
    "16-20 hrs/wk": [16, 20],
    "Fulltime": [40, 40]
}

const overlap = (a, b) => {
    if (a[1] == b[1] && a[0] == b[0]) return true
    return Math.max(0, Math.min(a[1], b[1]) - Math.max(a[0], b[0])) > 0
}

// TODO: complete model defaults
export class ApplicationList extends List {
    get model() {
        return ApplicationPosition
    }

    get universities() {
        return unique(this.models.filter(app => app.University.trim().length > 0).map(app => app.University.trim()))
    }

    get organizations() {
        return unique(this.models.filter(app => app.Organization.trim().length > 0).map(app => app.Organization.trim()))
    }

    get majors() {
        return unique(this.models.filter(app => app.Major.trim().length > 0).map(app => app.Major.trim()))
    }

    get years() {
        return unique(this.models.map(app => app.Year))
    }

    // Get time commitments
    get timeCommitments() {
        return [
            "1-5 hrs/wk", 
            "6-10 hrs/wk", 
            "11-15 hrs/wk",
            "16-20 hrs/wk",
            "Fulltime"
        ]
    }

    get industries() {
        var ret = new Set()
        this.models.forEach(app => {
            app.Industry.forEach(industry =>
                ret.add(industry.trim())
            )
        })
        return Array.from(ret)
    }

    get indices() {
        return this.models.map(pos => pos.Index)
    }

    posAt(index) {
        return this.models.find(pos => pos.Index === index)
    }

    // Helper function for filtered
    filteredByTableOptions(opt, application) {
        if (opt.University.length > 0) {
            if (!opt.University.includes(application.University.trim())) {
                return false
            }
        }
        if (opt.Organization.length > 0) {
            if (!opt.Organization.includes(application.Organization.trim())) {
                return false
            }
        }
        if (opt.Major.length > 0) {
            if (!opt.Major.includes(application.Major.trim())) {
                return false
            }
        }
        if (opt.Year.length > 0) {
            if (!opt.Year.includes(application.Year)) {
                return false
            }
        }
        if (opt.International.length > 0) {
            if (!opt.International.includes(application.International.trim())) {
                return false
            }
        }
        if (opt.Hours.length > 0) {
            let tcs = opt.Hours.map(optTC => timeCommitments[optTC])
            if (!tcs.some(tc => overlap(tc, application.Hours))) {
                return false
            }
        }
        if (opt.Industry.length > 0) {
            if (!opt.Industry.some(industry => application.Industry.includes(industry.trim()))) {
                return false
            }
        }
        if (opt.Rank1.length > 0) {
            if (!opt.Rank1.some(startupId => application.Startups[0] === startupId)) {
                return false
            }
        }
        if (opt.Rank2.length > 0) {
            if (!opt.Rank2.some(startupId => application.Startups[1] === startupId)) {
                return false
            }
        }
        if (opt.Rank3.length > 0) {
            if (!opt.Rank3.some(startupId => application.Startups[2] === startupId)) {
                return false
            }
        }
        return true
    }

    filtered(opt) {
        // Filters each application by not including if it does not include
        // a filtering property
        let applications = new ApplicationList(this.models.filter(application => {
            if (!this.filteredByTableOptions(opt, application)) { return false; }
            switch (opt.ViewType) {
                case VIEW_TALENT_POOL: {
                    if (opt.ViewValue === "") {
                        return application.RecruiterNotes.TalentPools.length > 0
                    }
                    return application.RecruiterNotes.TalentPools.includes(opt.ViewValue)
                }
                case VIEW_COMPANY: {
                    return application.Startups.includes(opt.ViewValue.id)
                }
                default:
                    return true;
            }
        }))
        return applications
    }

    sorted(opt) {
        //Returns a sorted version of the ApplicationList (Does not modify the original list)
        if (opt.SortValue.includes("Rank: ")) { //Custom sort to sort by startup rank
            var startup = opt.SortValue.substr(6)
            var compareFunction = (a, b) => {
                var rankA = a.Startups.indexOf(startup) >= 0 ? a.Startups.indexOf(startup) : 10
                var rankB = b.Startups.indexOf(startup) >= 0 ? b.Startups.indexOf(startup) : 10
                return (rankA < rankB) ? -1 : (rankA > rankB) ? 1 : 0;
            }
        }
        else if (opt.SortValue === "Rating") {
            var compareFunction = (a, b) => {
                return (a.RecruiterNotes.Rating < b.RecruiterNotes.Rating) ? -1 : (a.RecruiterNotes.Rating > b.RecruiterNotes.Rating) ? 1 : 0;
            }
        }
        else {
            var property = opt.SortValue
            if (this.models.length > 0 && !(property in this.models[0])) { //If Value is not in Applicant schema, defaults to LastName
                property = "LastName"
            } 
            var compareFunction = (a, b) => {
                return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            }
        }
        return [...this.models].sort((a, b) => opt.Ascending !== false ? compareFunction(a, b) : -1*compareFunction(a, b))
    }
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
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
