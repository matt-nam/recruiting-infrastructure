import { Model } from "./base";

export class Form extends Model {
    defaults() {
        return {
            FormLink: "",
            Verified: false,
        };
    }
}
