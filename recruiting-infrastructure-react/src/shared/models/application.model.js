import { Model } from "./base";
import { Skill } from "./skill.model";

export class Application extends Model {
    defaults() {
        return {
            StartupId: 0,
            PositionId: 0,
            RoundNumber: 0,
            StudentId: 0,

            Ethnicity: "",
            VeteranStatus: "",
            Sex: "",
            Disability: "",

            Startups: [],  // array of numbers
            Questions: [],  // array of strings
            Responses: [],  // array of strings
            Skills: [new Skill()],  // array of Skills

            Submitted: false,
            Submission: "",
            TimeSubmitted: "",  // ISO format
        };
    }
}
