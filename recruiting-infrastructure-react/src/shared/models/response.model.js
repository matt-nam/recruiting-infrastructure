import { Model } from "./base";

export class Response extends Model {
    defaults() {
        return {
            Question: "",
            Response: ""
        };
    }
}
