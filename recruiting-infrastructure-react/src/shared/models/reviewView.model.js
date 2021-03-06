import { Model, List } from "./base";
import { ApplicationPosition } from "./applicationPosition.model";
import { RecruiterNotes } from "./recruiterNotes.model";

export class ReviewView extends Model {
    defaults() {
        return {
            name: "",
            submitData: new RecruiterNotes,
        };
    }
}

/*
    To add a new field for the Recruiter Notes form, use the following code:

    component: "input" or "select"
    name: "name of field"
    label: "text that appears in the form"

    If "select" is chosen, add:

    options" [
        {
            component: "options"
            label: "text that appears in the dropdown menu"
        },
        { and so on }
    ]
*/

export const formData = [
    {
        component: "page",
        name: "page",
        label: "Applicant Review",
        fields: [
            {
                component: "input",
                name: "rating",
                label: "How would you rate this applicant?",
            },
            {
                component: "select",
                name: "status",
                label: "What should the status of this applicantion be?",
                options: [
                    {
                        component: "option",
                        label: "Read",
                    },
                    {
                        component: "option",
                        label: "Interview Requested",
                    },
                    {
                        component: "option",
                        label: "Interviewed",
                    },
                    {
                        component: "option",
                        label: "Rejected",
                    },
                    {
                        component: "option",
                        label: "Rejection Sent",
                    },
                    {
                        component: "option",
                        label: "Accepted",
                    },
                    {
                        component: "option",
                        label: "Acceptance Sent",
                    },
                    {
                        component: "option",
                        label: "Accepted by Startup",
                        value: ""
                    },
                    {
                        component: "option",
                        label: "Rejected by Startup",
                    },
                    {
                        component: "option",
                        label: "Workplan In",
                    },
                    {
                        component: "option",
                        label: "Withdrew",
                    }
                ]
            },
            {
                component: "input",
                name: "generalNotes",
                label: "Notes on the application.",
            }
        ]
    }
];
