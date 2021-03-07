import { Model } from "./base";

export class RecruiterNotes extends Model {
    defaults() {
        return {
            GeneralNotes: [{ Notes: "", RecruiterEmail: "", CreatedAt: "" }],
            InterviewNotes: [{ Notes: "", RecruiterEmail: "", CreatedAt: "" }],
            ExtraMaterial: "",

            Rating: 0,
            StartupPreferences: [true, true, true],
            StartupPairing: [],
            PositionPairing: [],
            TalentPools: [],
            FinalPairing: "",

            NewStartupPairing: [],
            NewPositionPairing: [],
            NewTalentPools: [],

            Withdrawn: false,
            NotableApplication: false,

            Status: {},
            /*
                Read
                Accepted by us
                Rejected by us
                Accepted by start-up
                Rejected by start-up
                Received work-plan
             */
        };
    }

    editEntry(listName, element, isAdding) {
        // listName is one of StartupPairing, PositionPairing, or TalentPools
        // will either add or delete element from given list from this recruiter notes
        if (isAdding) {
            if (!this.listName.includes(element)) {
                this.listName = this.listName.filter(item => item !== "Deleted: "+element)
                this.listName.push(element)
            }
        }
        else {
            var i = this.listName.indexOf(element)
            if (i >= 0) {
                this.listName[i] = "Deleted: "+element
            }
        }
    }
}

export const recruiterNotesFactory = (res) => {
    return {
        ...res,
        NewStartupPairing: res.StartupPairing,
        NewPositionPairing: res.PositionPairing,
        NewTalentPools: res.TalentPools,
    }
}

export const getRecruiterNotes = (recruiterNotes, keyValue, emailValue) => {
    const index = recruiterNotes[keyValue].findIndex(notes => notes.RecruiterEmail == emailValue)
    if (index === -1) {
        return ""
    } else {
        return recruiterNotes[keyValue][index].Notes
    }
}
