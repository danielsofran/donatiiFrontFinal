import {Serializable} from "./Deserialize";
import {Tip} from "./Enums";

export class Costumizabil implements Serializable<Costumizabil>{
    id: number = 0;
    tip: Tip = Tip.Item;
    data: string = "";
    costBani: number = 0;
    levelMin: number = 0;

    deserialize(json: any): Costumizabil {
        return Object.assign(new Costumizabil(), json);
    }

    deserializeArray(json: any): Costumizabil[] {
        return json.map(this.deserialize);
    }
}