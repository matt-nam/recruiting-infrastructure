export const formData = {
    component: "page",
    name: "page",
    label: "Applicant Review",
    fields: [
        {
            component: "input",
            name: "GeneralNotes",
            label: "Application Notes:",
            inputType: "recruiter",
            valueType: "recruiter",
            class: "big",
            numRow: 6,
        },
        {
            component: "input",
            name: "InterviewNotes",
            label: "Interview Notes: ",
            inputType: "recruiter",
            valueType: "recruiter",
            class: "big",
            numRow: 6,
        },
        {
            component: "number",
            name: "Rating",
            label: "How would you rate this applicant?",
            inputType: "regular",
            valueType: "regular",
        },
        {
            component: "multiselect",
            name: "NewStartupPairing",
            label: "Potential Start-up Pairing",
            inputType: "startups",
            valueType: "startups",
            multiValueType: "startups"
        },
        {
            component: "multiselect",
            name: "NewPositionPairing",
            label: "Potential Position Pairing",
            inputType: "regular",
            valueType: "positions",
            multiValueType: "positions"
        },
        {
            component: "multiselect",
            name: "NewTalentPools",
            label: "Potential Talent Pool Assigments",
            inputType: "regular",
            valueType: "talentpools",
            multiValueType: "talentpools"
        },
        {
            component: "input",
            name: "ExtraMaterial",
            label: "Extra material to add to applicants (e.g. portfolio links)",
            inputType: "regular",
            valueType: "regular",
            numRow: 1,
        },
        {
            component: "select",
            name: "Status",
            label: "What should the status of this application be?",
            inputType: "regular",
            valueType: "status",
            options: [
                {
                    component: "option",
                    label: "NO_STATUS",
                },
                {
                    component: "option",
                    label: "READ",
                },
                {
                    component: "option",
                    label: "RQ_INTERVIEW",
                },
                {
                    component: "option",
                    label: "INTERVIEWED",
                },
                {
                    component: "option",
                    label: "REJECTED",
                },
                {
                    component: "option",
                    label: "REJECTION_SENT",
                },
                {
                    component: "option",
                    label: "ACCEPTED",
                },
                {
                    component: "option",
                    label: "ACCEPTANCE_SENT",
                },
                {
                    component: "option",
                    label: "ST_ACCEPTED",
                    value: ""
                },
                {
                    component: "option",
                    label: "ST_REJECTED",
                },
                {
                    component: "option",
                    label: "WORKPLAN_IN",
                },
                {
                    component: "option",
                    label: "WITHDREW",
                }
            ]
        },
    ]
};