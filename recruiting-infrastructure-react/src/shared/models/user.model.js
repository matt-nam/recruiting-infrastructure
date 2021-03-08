import { Model } from "./base";

export class User extends Model {
    defaults() {
        return {
            email: ""
        };
    }

    constructor(email) {
        super();
        this.email = email;
    }
}
