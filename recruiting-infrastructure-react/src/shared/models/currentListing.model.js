import { Model } from "./base";
import { Position } from "./position.model"
import { FounderList } from "./founder.model"
import { StartupInfo } from "./startupInfo.model"

export class CurrentListing extends Model {
    defaults() {
        return {
            Position: new Position(),
            Founders: new FounderList(), 
            StartupInfo: new StartupInfo(),
        };
    }
}