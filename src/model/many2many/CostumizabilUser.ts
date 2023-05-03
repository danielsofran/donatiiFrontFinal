import {Serializable} from "../Deserialize";

export class CostumizabilUser implements Serializable<CostumizabilUser>{
    idUser: number = 0;
    idCostumizabil: number = 0;

    deserialize(json: any): CostumizabilUser {
        return Object.assign(new CostumizabilUser(), json);
    }

    deserializeArray(json: any): CostumizabilUser[] {
        return json.map(this.deserialize);
    }
}