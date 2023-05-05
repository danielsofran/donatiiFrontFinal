import {Serializable} from "./Deserialize";

export class Poza implements Serializable<Poza>{
    id: number = 0;
    url: string = "";

    deserialize(json: any): Poza {
        return Object.assign(new Poza(), json);
    }

    deserializeArray(json: any): Poza[] {
        return json.map(this.deserialize);
    }
}