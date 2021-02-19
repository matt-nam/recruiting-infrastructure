import { Model, List } from "./base";
import { SkillsList } from "./skill.model"

export class Position extends Model {
    defaults() {
        return {
            StartupId: "",
            PositionId: "",
            Selected: false,
            Round: 0,

            Title: "",
            Skills: new SkillsList(), 

            MaxInterns: 0,
            TimeCommitment: "",
            TimeCommitmentVal: [],
            Timezone: "",
            Location: "",
            TimePeriod: "", 
            TeamSize: "",

            Qualifications: "",
            Projects: ""
        };
    }
}

export class PositionList extends List {
    get model() {
        return Position
    }
}
