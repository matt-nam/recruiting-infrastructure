import { Model } from "./base";
import { RecruiterNotes } from "./recruiterNotes.model";
import { Response } from "./response.model";

export class ApplicationPosition extends Model {
    defaults() {
        return {
            Index: 0,
            ApplicationId: "",
            Round: 3,
            FirstName: "",
            LastName: "",
            Email: "",
            Email2: "",
            PhoneNumber: "",
            CreatedAt: "",
            International: false,
            InternationalLocation: "",
            Authorization: false,
            AuthorizationType: false,

            University: "",
            Organization: "",
            Major: "",
            Year: 2024,

            Responses: [], // list of Response object {Question: "", Response: ""}

            Startups: [""], //Custom Sort on Startup Rank
            IdealPosition: "",
            Rank1: "",
            Rank2: "",
            Rank3: "",
            Skills: "",
            OtherStartups: "",

            ProfitType: "",
            Industry: [""],
            Funding: "",

            Aspirations: "",
            AdditionalInfo: "",
            AdditionalFile: "",

            Hours: "", //Might do a custom sort based on lower bound
            IsPriority: false,
            StudentLocation: "",
            ToFall: false,

            LinkedIn: "",
            Resume: "",
            Portfolio: "",

            Gender: "",
            Ethnicity: "",
            Disability: "",
            Acknowledgement: false,

            Reference: "",

            RecruiterNotes: new RecruiterNotes() // RecruiterNotes object
        };
    }
    get priority() {
        return {
            Index: 0,
            ApplicationId: 1,
            Round: 2,
            FirstName: 3,
            LastName: 4,
            Email: 5,
            PhoneNumber: 6,
            CreatedAt: 7,
            International: 8,
            InternationalLocation: 9,
            Authorization: 10,
            AuthorizationType: 11,

            University: 12,
            Organization: 13,
            Major: 14,
            Year: 15,

            Responses: 16,

            Startups: 17,
            IdealPosition: 18,
            Rank1: 19,
            Rank2: 20,
            Rank3: 21,
            Skills: 22,
            OtherStartups: 23,

            ProfitType: 24,
            Industry: 25,
            Funding: 26,

            Aspirations: 27,
            AdditionalInfo: 28,
            AdditionalFile: 29,

            Hours: 30, //Might do a custom sort based on lower bound
            IsPriority: 31,
            StudentLocation: 32,
            ToFall: 33,

            LinkedIn: 34,
            Resume: 35,
            Portfolio: 36,

            Gender: 37,
            Ethnicity: 38,
            Disability: 39,
            Acknowledgement: 40,

            Reference: 41
        }
    }
}
