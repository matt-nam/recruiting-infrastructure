import { Model } from "./base";

export class FilterOptions extends Model {
    defaults() {
        return {
            KeywordSearch: "",
            IndustrySearch: [],
            Role: [], // list of strings
            TimeCommitment: [], // array for two values (lower and upper bound)
            TimePeriod: [], // list of strings
            Experience: [], // list of strings
            Funding: [], // list of strings
            Paid: "",
            CurrentStartupId: "",
            CurrentPositionId: ""
        };
    }
}
