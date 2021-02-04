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

export const filterPositionWithOpt = (opt, pos) => {
    if (opt.Role.length > 0) {
        if (!opt.Role.includes(pos.Title.trim())) {
            return false
        }
    }
    if (opt.TimeCommitment.length > 0) {
        if (opt.TimeCommitment[0] < pos.TimeCommitmentVal[0] || opt.TimeCommitment[1] > pos.TimeCommitmentVal[1]) {
            return false
        }
    }
    if (opt.TimePeriod.length > 0) {
        if (!opt.TimePeriod.includes(pos.TimePeriod.trim())) {
            return false
        }
    }
    if (opt.Experience.length > 0) {
        var expLevels = pos.Skills.map(skill => skill.Level)
        if (!expLevels.some(level => opt.Experience.indexOf(level.trim()) >= 0)) {
            return false
        }
    }
    return true
}

export class PositionList extends List {
    get model() {
        return Position
    }
}
