export interface ICalendar {
  user: number;
  sets: [
    {
      id: number;
      days: string[];
    }
  ]
}
