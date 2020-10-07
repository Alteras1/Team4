export interface ISets {
    id?: number;
    user: number;
    name: String;
    exercises: ISetExercises[]
}

export interface ISetExercises {
    id: number;
    name?: string;
    amount: number;
}