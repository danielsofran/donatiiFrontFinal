import {Serializable} from "../Deserialize";
import {Cauza, CauzaPersonala} from "../Cauza";

export class Donatie implements Serializable<Donatie>{
    id: number = 0;
    cauzaId: number = 0;
    cauzaTitlu: string = "";
    suma: number = 0;
    moneda: string = "RON";
    data: Date = new Date();

    deserialize(json: any): Donatie {
        return Object.assign(new Donatie(), json);
    }

    deserializeArray(json: any): Donatie[] {
        return json.map(this.deserialize);
    }

    convertCurrency() {
        return this.suma;
    }
}