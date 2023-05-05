import {GenderType} from "./Enums";
import {Serializable} from "./Deserialize";
import {TagAnimal} from "./TagAnimal";

export class User implements Serializable<User>{
    id: number = 0;
    username: string = "";
    email: string = "";
    parola: string = "";
    fullName: string = "";
    gender: GenderType = GenderType.Confidential;
    coins: number;
    level: number;

    interese: TagAnimal[];

    deserialize(json: any): User {
        return Object.assign(new User(), json);
    }

    deserializeArray(json: any): User[] {
        return json.map(this.deserialize);
    }
}