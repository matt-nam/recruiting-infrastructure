import { Model, List } from "./base";
import { RecruiterNotes } from "./recruiterNotes.model";

export class ReviewView extends Model {
    defaults() {
        return {
            rank: {
                element: 'select', type: 'number', value: Rating,
                validation: { required: true }, valid: false, touched: false,
                errorMessage: '', label: "How would you rank this applicant?"
            },
            status: {
              element: 'select', type: 'text', value: Status,
              validation: { required: true }, valid: false, touched: false,
              errorMessage: '', label: "What should the status of this applicantion be?"
            },
            notes: {
              element: 'input', type: 'text', value: GeneralNotes,
              validation: { required: true }, valid: false, touched: false,
              errorMessage: '', label: "Notes on the application."
            }
        };
    }
}
