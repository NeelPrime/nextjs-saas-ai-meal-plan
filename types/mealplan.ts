export interface MealPlanInput {
  dietType: string;
  calories: number;
  allergies: string;
  cuisine: string;
  snacks: string;
  days?: number;
}

export interface DailyMealPlan {
  Breakfast?: string;
  Lunch?: string;
  Dinner?: string;
  Snacks?: string;
}

export interface WeeklyMealPlan {
  [day: string]: DailyMealPlan;
}

export interface MealPlanResponse {
  mealPlan?: WeeklyMealPlan;
  error?: string;
}

export const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
