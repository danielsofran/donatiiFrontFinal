import {User} from "./User";
import {Serializable} from "./Deserialize";
import {TagAnimal} from "./TagAnimal";
import {Poza} from "./Poza";

abstract class AbstractCauza {
    id: number = 0;
    user: User = new User();
    descriere: string = "";
    titlu: string = "";
    locatie: string = "";
    sumaMinima: number = 0;
    sumaStransa: number = 0;
    moneda: string = "RON";
    nrSustinatori: number = 0;
    poze: Poza[] = [];

    isCompleted() {
        return this.sumaMinima < this.sumaStransa;
    }

    static deserialize(json: any): AbstractCauza {
        let rez: AbstractCauza = Object.assign(this, json);
        rez.user = Object.assign(new User(), json['user']);
        rez.poze = [];
        for(let poza of json['poze']) {
            rez.poze.push(new Poza().deserialize(poza));
        }
        return rez;
    }

    static deserializeArray(json: any): AbstractCauza[] {
        return json.map(AbstractCauza.deserialize);
    }
}

export class CauzaPersonala extends AbstractCauza implements Serializable<CauzaPersonala> {
    tagAnimal: TagAnimal = new TagAnimal();
    numeAnimal: string = "";
    varstaAnimal: number = 0;
    rasaAnimal: string = "";

    deserialize(json: any): CauzaPersonala {
        let rez: any = AbstractCauza.deserialize(json);
        rez.tagAnimal = new TagAnimal().deserialize(json['tagAnimal']);
        rez.numeAnimal = json['numeAnimal'];
        rez.varstaAnimal = json['varstaAnimal'];
        rez.rasaAnimal = json['rasaAnimal'];
        return rez;
    }

    deserializeArray(json: any): CauzaPersonala[] {
        return json.map(this.deserialize);
    }

}

export class CauzaAdapost extends AbstractCauza implements Serializable<CauzaAdapost> {
    nume: string = "";
    taguri: TagAnimal[] = [];

    deserialize(json: any): CauzaAdapost {
        let rez: any = AbstractCauza.deserialize(json);
        rez.nume = json['nume'];
        rez.taguri = [];
        for(let tag of json['taguri']) {
            rez.taguri.push(new TagAnimal().deserialize(tag));
        }
        return rez;
    }

    deserializeArray(json: any): CauzaAdapost[] {
        return json.map(this.deserialize);
    }
}

export type Cauza = CauzaAdapost | CauzaPersonala;