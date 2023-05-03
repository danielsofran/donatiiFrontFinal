import {Serializable} from "../Deserialize";

export class TagAdapost implements Serializable<TagAdapost>{
    idTag: number = 0;
    idAdapost: number = 0;

    deserialize(json: any): TagAdapost {
        return Object.assign(new TagAdapost(), json);
    }

    deserializeArray(json: any): TagAdapost[] {
        return json.map(this.deserialize);
    }

}