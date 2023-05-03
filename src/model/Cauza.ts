import {User} from "./User";
import {Serializable} from "./Deserialize";
import {TagAnimal} from "./TagAnimal";

abstract class Cauza implements  Serializable<Cauza>{
    id: number = 0;
    user: User = new User();
    descriere: string = "";
    titlu: string = "";
    locatie: string = "";
    sumaMinima: number = 0;
    sumaStransa: number = 0;

    isCompleted() {
        return this.sumaMinima < this.sumaStransa;
    }
    deserialize(json: any): Cauza {
        let rez: Cauza = Object.assign(this, json);
        rez.user = Object.assign(new User(), json['user']);
        return rez;
    }

    deserializeArray(json: any): Cauza[] {
        return json.map(this.deserialize);
    }
}

export class CauzaPersonala extends Cauza implements Serializable<CauzaPersonala> {
    tagAnimal: TagAnimal = new TagAnimal();
    numeAnimal: string = "";
    varstaAnimal: number = 0;
    rasaAnimal: string = "";

    deserialize(json: any): CauzaPersonala {
        let rez: CauzaPersonala = Object.assign(this, json);
        rez.user = Object.assign(new User(), json['user']);
        rez.tagAnimal = Object.assign(new TagAnimal(), json['tagAnimal']);
        return rez;
    }

    deserializeArray(json: any): CauzaPersonala[] {
        return json.map(this.deserialize);
    }

}

export class CauzaAdapost extends Cauza implements Serializable<CauzaAdapost> {
    nume: string = "";

    deserialize(json: any): CauzaAdapost {
        let rez: CauzaAdapost = Object.assign(this, json);
        rez.user = Object.assign(new User(), json['user']);
        return rez;
    }

    deserializeArray(json: any): CauzaAdapost[] {
        return json.map(this.deserialize);
    }
}