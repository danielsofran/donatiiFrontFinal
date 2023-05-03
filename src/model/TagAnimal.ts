import {Serializable} from "./Deserialize";

export class TagAnimal implements Serializable<TagAnimal>{
    id: number = 0;
    nume: string = "";

    deserialize(json: any): TagAnimal {
        return Object.assign(new TagAnimal(), json);
    }

    deserializeArray(json: any): TagAnimal[] {
        return json.map(this.deserialize);
    }
}