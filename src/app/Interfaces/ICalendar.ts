export interface ICalendar {
  id: number,
  user: number,
  sets: [
    {
      id: number,
      days: string[]
    }
  ]
}

export interface IWeek {
  sunday: any[],
  monday: any[],
  tuesday: any[],
  wednesday: any[],
  thursday: any[],
  friday: any[],
  saturday: any[]
}
