import { Model, List } from "./base";

export class Founder extends Model {
    defaults() {
        return {
            FounderId: 0,
            Name: "",
            LinkedIn: "",
            SchoolSpecific: "",
            AlmaMater: "",
            Startups: [],  // array of strings
        };
    }
}

export class FounderList extends List {
    get model() {
        return Founder
    }
}
