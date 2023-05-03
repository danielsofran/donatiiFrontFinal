export interface Serializable<T> {
    deserialize(json: any):T;
    deserializeArray(json: any):T[];
}