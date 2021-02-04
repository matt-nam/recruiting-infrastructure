import { Form } from './form.model';
import { Model } from "./base";

// let IInternship: {
//     Status?: '' | 'In Progress' | 'Completed';
//     StartupId?: number;
//     Round?: number;
// }
//
// let IResponse: {
//     IdealCompany?: string;
//     Creativity?: string;
//     MadeDifference?: string;
//     Interests?: string;
//     Skills?: string;
//     CareerAspirations?: string;
//     SocialIssues?: string;
//     AdditionalInfo?: string;
//     Portfolio?: string;
// }
//
// export let IStudent: {
//     StudentId: number;
//     Name: string;
//     Email: string;
//     PhoneNumber: string;
//     Year: number;
//     Photo: string;
//     College: string;
//     Club: string;
//     Major: string;
//     Resume: string;
//     LinkedIn: string;
//     Forms: Array<IForm>;
//     AllVerified: boolean;
//     Admin: boolean;
//     Paired: boolean;
//
//     Ethnicity: string;
//     VeteranStatus: string;
//     Sex: string;
//     Disability: string;
//
//     Internships: Array<IInternship>;
//
//     Hours: string;
//     Availability: string;
//     ProfitType: string;
//     Industry: Array<string>;
//     Technical: string;
//     Paid: string;
//     Funding: string;
//
//     Responses: Array<IResponse>;
//
//     Startups: Array<string>;
// }
//
// export const defaultValue: Readonly<IStudent> = {};

// TODO: complete model defaults
export class Student extends Model {
    defaults () {
        return {};
    }
}
