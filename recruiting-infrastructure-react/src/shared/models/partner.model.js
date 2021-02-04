import { Model, List } from "./base";
import { StartupInfo, FounderList } from "shared/models"

export class Partner extends Model {
    defaults() {
        return {
            StartupInfo: new StartupInfo(),
            Founders: new FounderList()
        };
    }
}

const partnerFactory = (partner) => {
    return new Partner({
        Founders: new FounderList(partner.Founders),
        StartupInfo: new StartupInfo(partner.StartupInfo)
    })
}

const comparePartner = (a, b) => {
    if (a.StartupInfo.StartupName < b.StartupInfo.StartupName) {
        return -1;
    }
    if (a.StartupInfo.StartupName > b.StartupInfo.StartupName) {
        return 1;
    }
    return 0;
}


export class PartnerList extends List {
    get model() {
        return Partner
    }
}

export const partnerListFactory = (data) => {
    var ret = data.map(partner => partnerFactory(partner))
    return new PartnerList(ret.sort(comparePartner))
}

