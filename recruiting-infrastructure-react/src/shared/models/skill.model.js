import { Model, List } from "./base";

export class Skill extends Model {
    defaults() {
        return {
            Skill: "",
            Level: "",
        };
    }
}

export class SkillsList extends List {
    get model() {
        return Skill
    }
}
