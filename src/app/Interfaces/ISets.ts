export interface ISets {
    id: number;
    user: number;
    name: string;
    exercises: ISetExercises[]
}

export interface ISetExercises {
    id: number;
    amount: number;
}