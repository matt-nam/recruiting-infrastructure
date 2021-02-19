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

            Hours: "", //Might do a custom sort based on lower bound
            ProfitType: "",
            Industry: [""],
            Funding: [""],

            Intro: "",
            Startups: [""], //Custom Sort on Startup Rank
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
