import {Serializable} from "../Deserialize";

export class Donatie implements Serializable<Donatie>{
    id: number = 0;
    idUser: number = 0;
    idCauza: number = 0;
    suma: number = 0;
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