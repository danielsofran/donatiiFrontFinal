import {GenderType} from "./Enums";
import {Serializable} from "./Deserialize";
import {TagAnimal} from "./TagAnimal";
import {Costumizabil} from "./Costumizabil";
import {Donatie} from "./many2many/Donatie";
import {Cauza, deserializeCauzaArray} from "./Cauza";

export class User implements Serializable<User>{
    id: number = 0;
    username: string = "";
    email: string = "";
    parola: string = "";
    fullName: string = "";
    gender: GenderType = GenderType.Confidential;
    coins: number = 0;
    level: number = 0;

    interese: TagAnimal[] = [];
    costumizabile: Costumizabil[] = [];
    echipate: Costumizabil[] = [];
    sustineri: number[] = []; // lista id-urilor cauzelor sustinute de user-ul curent
    donatii: Donatie[] = []; // lista de donatii facute de user-ul curent
    cauze: Cauza[] = []; // lista id-urilor cauzelor create de user-ul curent

    static copy(user: User): User {
        let rez: User = new User();
        rez.id = user.id;
        rez.username = user.username;
        rez.email = user.email;
        rez.parola = user.parola;
        rez.fullName = user.fullName;
        rez.gender = user.gender;
        rez.coins = user.coins;
        rez.level = user.level;
        rez.interese = user.interese;
        rez.costumizabile = user.costumizabile;
        rez.echipate = user.echipate;
        rez.sustineri = user.sustineri;
        rez.donatii = user.donatii;
        rez.cauze = user.cauze;
        return rez;
    }

    deserialize(json: any): User {
        // WARNING: may fail if there is an empty array as CauzaPersonala, and a new lis
        let rez: User = Object.assign(new User(), json);
        rez.interese = json.interese.map((item: any) => new TagAnimal().deserialize(item));
        rez.costumizabile = json.costumizabile.map((item: any) => new Costumizabil().deserialize(item));
        rez.echipate = json.echipate.map((item: any) => new Costumizabil().deserialize(item));
        rez.sustineri = json.sustineri.map((item: any) => item);
        rez.donatii = json.donatii.map((item: any) => new Donatie().deserialize(item));
        rez.cauze = deserializeCauzaArray(json.cauze);
        return rez;
    }

    deserializeArray(json: any): User[] {
        return json.map(this.deserialize);
    }
}