import { Model } from "./base";

// export let IDetail: {
//     maxInterns?: number;
//     timeCommitment?: string;
//     timezone?: string;
//     location?: string;
//     timePeriod?: Array<string>;
//     teamSize?: string;
// }
//
// export let IDescription: {
//     blurb?: string;
//     qualifications?: string;
//     projects?: string;
//     interests?: string;
//     benefits?: string;
//     culture?: string;
// }
//
// export let IStartupRound: {
//     startupId?: number;
//     round?: number;
//     details?: IDetail;
//     description?: IDescription;
//     interns?: Array<number>;
//     questions?: Array<string>;
// }
//
// export const defaultValue: Readonly<IStartupRound> = {};

// TODO: complete model defaults
export class StartupRound extends Model {
    defaults () {
        return {};
    }
}
