import { Model } from "./base";
import { VIEW_ALL_APPLICANTS, VIEW_ACCEPTED, VIEW_REJECTED } from 'services/constants';

export class FilterOptions extends Model {
    defaults() {
        return {
            ViewType: VIEW_ALL_APPLICANTS,
            ViewValue: "",
            SortValue: "",
            Ascending: true
        };
    }
}
