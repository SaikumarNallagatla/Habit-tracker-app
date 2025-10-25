
export interface Habit {
  id: string;
  name: string;
  icon: string;
  streak: number;
  completedDates: string[]; // Stores dates in "YYYY-MM-DD" format
}

export interface SuggestedHabit {
  name: string;
  category: string;
  description: string;
}
