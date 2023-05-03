import {Serializable} from "../Deserialize";

export class Interes implements Serializable<Interes>{
    idUser: number = 0;
    idTagAnimal: number = 0;

    deserialize(json: any): Interes {
        return Object.assign(new Interes(), json);
    }

    deserializeArray(json: any): Interes[] {
        return json.map(this.deserialize);
    }
}