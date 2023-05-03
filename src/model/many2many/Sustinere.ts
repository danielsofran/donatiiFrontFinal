import {Serializable} from "../Deserialize";

export class Sustinere implements Serializable<Sustinere>{
    idUser: number = 0;
    idCauza: number = 0;

    deserialize(json: any): Sustinere {
        return Object.assign(new Sustinere(), json);
    }

    deserializeArray(json: any): Sustinere[] {
        return json.map(this.deserialize);
    }

}