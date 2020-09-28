import { Url } from 'url';

export interface IExercise {
  id: number;
  name: string;
  description: string;
  category: number;
  muscles: number[];
  muscles_secondary: number[];
  equipment: number[];
}


