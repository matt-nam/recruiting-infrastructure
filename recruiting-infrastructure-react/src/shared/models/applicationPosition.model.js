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
            Funding: [""],
            
            Aspirations: "",
            AdditionalInfo: "",
            AdditionalFile: "",
            
            Hours: "", //Might do a custom sort based on lower bound
            HasInternship: false,
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
}
