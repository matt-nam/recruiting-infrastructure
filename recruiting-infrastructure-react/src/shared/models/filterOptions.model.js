import { Model } from "./base";
import { VIEW_ALL_APPLICANTS, VIEW_ACCEPTED, VIEW_REJECTED } from 'services/constants';

export class FilterOptions extends Model {
    defaults() {
        return {
            ViewType: VIEW_ALL_APPLICANTS,
            ViewValue: "",
            SortValue: "",
            Ascending: true,
            University: [], // list of strings
            Organization: [], // list of strings
            Major: [], // list of strings
            Year: [], // list of ints
            International: "", // "Yes" or "No"
            Hours: [], // array for two values (lower and upper bound)
            Industry: [], // list of strings
            Rank1: [], // list of strings
            Rank2: [], // list of strings
            Rank3: [], // list of strings
            KeywordSearch: ""
        };
    }
}
