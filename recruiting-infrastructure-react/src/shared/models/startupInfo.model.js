import { Model } from './base';
import { Form } from './form.model';

export class StartupInfo extends Model {
    defaults() {
        return {
            StartupId: "",
            StartupName: "",

            Website: "",
            LogoLink: "",

            Industries: [], // array of strings
            Technical: false,
            Freshman: false,
            Paid: "",
            PaidInfo: "",
            Funding: "",
            FounderInfo: [], // array of strings (ex. "6f4fba9e-4d14-11eb-88d3-08d40c610f6b")
            Blurb: "",
            Interests: "",
            Benefits: ""
        };
    }
}
