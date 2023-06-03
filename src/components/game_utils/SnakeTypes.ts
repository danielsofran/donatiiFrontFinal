export interface GestureEventType {
    nativeEvent: {
        translationX: number;
        translationY: number;
        key?: string;
    };
}

export interface Coordinate {
    x: number;
    y: number;
}

export enum Direction {
    Right,
    Up,
    Left,
    Down,
}