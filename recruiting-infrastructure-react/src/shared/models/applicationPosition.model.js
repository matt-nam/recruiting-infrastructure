import { Model } from "./base";
import { RecruiterNotes } from "./recruiterNotes.model";
import { Response } from "./response.model";

export class ApplicationPosition extends Model {
    defaults() {
        return {
            Index: 0,
            ApplicationId: "",
            Round: 0,
            FirstName: "",
            LastName: "",
            Email: "",
            PhoneNumber: "",
            CreatedAt: "",

            University: "",
            Organization: "",
            Major: "",
            Year: 0,
            LinkedIn: "",
            Resume: "",
            Portfolio: "",
            Video: "",

            Reference: "",

            International: "",
            Authorization: "",
            Gender: "",
            Ethnicity: "",
            Disability: "",
            Acknowledgement: false,

            Hours: "",
            ProfitType: "",
            Industry: [""],
            Funding: [""],

            Intro: "",
            Startups: [""],
            MatchedLater: false,
            Rank1: "",
            Rank2: "",
            Rank3: "",

            Responses: [new Response()], // list of Response object {Question: "", Response: ""}

            Interests: "",
            Aspirations: "",
            AdditionalInfo: "",
            AdditionalFile: "",
            Skills: "",

            RecruiterNotes: new RecruiterNotes() // RecruiterNotes object
        };
    }
}

export const compareApplicationPosition = (a, b) => {
    if (a.LastName < b.LastName) {
        return -1;
    }
    if (a.LastName > b.LastName) {
        return 1;
    }
    return 0;
}
