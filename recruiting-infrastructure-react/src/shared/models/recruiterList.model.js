import { List } from "./base";
import { User } from "./user.model"

export class RecruiterList extends List {
    get model() {
        return User
    }
}

export const recruiterListFactory = (data) => {
    return new RecruiterList(data.map(e => {return {email: e.Email, name: e.Name, calendlyLink: e.CalendlyLink}}))
}

export const getRecruiterName = (recruiterList, emailValue) => {
    const index = recruiterList.models.findIndex(rec => rec.email == emailValue)
    if (index === -1) {
        return emailValue
    } else {
        return recruiterList.models[index].name
    }
}