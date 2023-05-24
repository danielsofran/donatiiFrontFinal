import {Serializable} from "./Deserialize";
import {Tip} from "./Enums";
import {User} from "./User";

export enum CostumizabilState
{
    DISABLED, BUYABLE, EQUIPPED, UNEQUIPPED
}

export class Costumizabil implements Serializable<Costumizabil>{
    id: number = 0;
    tip: Tip = Tip.Item;
    url: string = "";
    costBani: number = 0;
    levelMin: number = 0;

    state(user: User): CostumizabilState {
        if(user.costumizabile.includes(this)) {
            if(user.echipate.includes(this)) {
                return CostumizabilState.EQUIPPED;
            }
            return CostumizabilState.UNEQUIPPED;
        }
        if(user.coins >= this.costBani && user.level >= this.levelMin) {
            return CostumizabilState.BUYABLE;
        }
        return CostumizabilState.DISABLED;
    }

    deserialize(json: any): Costumizabil {
        return Object.assign(new Costumizabil(), json);
    }

    deserializeArray(json: any): Costumizabil[] {
        return json.map(this.deserialize);
    }
}