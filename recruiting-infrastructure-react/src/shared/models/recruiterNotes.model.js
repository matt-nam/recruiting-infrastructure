import { Model } from "./base";

export class RecruiterNotes extends Model {
    defaults() {
        return {
            GeneralNotes: [{ Notes: "", RecruiterId: "", CreatedAt: "" }],
            InterviewNotes: [{ Notes: "", RecruiterId: "", CreatedAt: "" }],
            ExtraMaterial: "",

            Rating: 0,
            StartupPairing: [""],
            PositionPairing: [""],
            TalentPools: [""],
            RejectedPreferences: [""],

            Withdrawn: false,
            NotableApplication: false,
            Readers: [""],
            Interviewers: [ {RecruiterId: "", Status: ""} ], // Status: "Asked for interview" | "Interview"
            Status: "",
            /*
                Read
                Accepted by us
                Rejected by us
                Accepted by start-up
                Rejected by start-up
                Received work-plan
             */
            StatusDetails: ""
        };
    }
}
