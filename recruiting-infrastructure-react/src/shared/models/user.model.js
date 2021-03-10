import { Model } from "./base";

export class User extends Model {
    defaults() {
        return {
            email: "",
            name: "",
            calendlyLink: ""
        };
    }

    constructor(user) {
        super();
        if (user) {
            this.email = user.email;
            this.name = user.name;
            this.calendlyLink = user.calendlyLink;
        }
    }
}
