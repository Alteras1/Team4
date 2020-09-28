interface IExerciseInfo{
  name: string;
  category: IExerciseCategory[];
  description: string;
  muscles: IMuscle[];
  muscles_secondary: IMuscle[];
  equipment: IEquipment[];
}
