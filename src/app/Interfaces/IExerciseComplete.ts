export interface IExerciseComplete {
  id: number;
  name: string;
  description: string;
  category: number;
  muscles: number[];
  muscles_secondary: number[];
  equipment: number[];
  image: String;
}
