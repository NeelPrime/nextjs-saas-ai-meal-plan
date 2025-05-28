"use client";

import Spinner from "@/components/spinner";
import { generateMealPlan } from "@/services/mealplan";
import {
  MealPlanInput,
  MealPlanResponse,
  DailyMealPlan,
  daysOfTheWeek,
} from "@/types/mealplan";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function MealPlanDashboard() {
  const { mutate, isPending, isSuccess, data } = useMutation<
    MealPlanResponse,
    Error,
    MealPlanInput
  >({
    mutationFn: generateMealPlan,
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload: MealPlanInput = {
      dietType: formData.get("dietType")?.toString() || "",
      calories: Number(formData.get("calories")) || 2000,
      allergies: formData.get("allergies")?.toString() || "",
      cuisine: formData.get("cuisine")?.toString() || "",
      snacks: formData.get("snacks")?.toString() || "",
      days: Number(formData.get("days")) || 7,
    };
    console.log(payload);

    mutate(payload);
  };

  const getMealPlanForDay = (day: string): DailyMealPlan | undefined => {
    if (!data?.mealPlan) return undefined;
    return data?.mealPlan[day];
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Panel: Form */}
        <div className="w-full md:w-1/3 lg:w-1/4 p-6 bg-cyan-500 text-white">
          <h1 className="text-2xl font-bold mb-6 text-center">
            AI Meal Plan Generator
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Diet Type */}
            <div>
              <label
                htmlFor="dietType"
                className="block text-sm font-medium mb-2"
              >
                Diet Type
              </label>
              <input
                type="text"
                id="dietType"
                name="dietType"
                required
                className="w-full px-3 py-2 border border-cyan-300 rounded-md text-black focus:outline-none bg-white focus:bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-400"
                placeholder="e.g., Vegetarian, Keto, Mediterranean"
              />
            </div>

            {/* Calories */}
            <div>
              <label
                htmlFor="calories"
                className="block text-sm font-medium mb-1"
              >
                Daily Calorie Goal
              </label>
              <input
                type="number"
                id="calories"
                name="calories"
                required
                min={500}
                max={15000}
                className="w-full px-3 py-2 border border-cyan-300 rounded-md text-black focus:outline-none bg-white focus:bg-white placeholder:text-gray-400  focus:ring-2 focus:ring-cyan-400"
                placeholder="e.g., 2000"
              />
            </div>

            {/* Allergies */}
            <div>
              <label
                htmlFor="allergies"
                className="block text-sm font-medium mb-1"
              >
                Allergies or Restrictions
              </label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                className="w-full px-3 py-2 border border-cyan-300 rounded-md text-black bg-white focus:bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="e.g., Nuts, Dairy, None"
              />
            </div>

            {/* Preferred Cuisine */}
            <div>
              <label
                htmlFor="cuisine"
                className="block text-sm font-medium mb-1"
              >
                Preferred Cuisine
              </label>
              <input
                type="text"
                id="cuisine"
                name="cuisine"
                className="w-full px-3 py-2 border border-cyan-300 rounded-md text-black focus:outline-none focus:ring-2 bg-white focus:bg-white placeholder:text-gray-400  focus:ring-cyan-400"
                placeholder="e.g., Italian, Chinese, No Preference"
              />
            </div>

            {/* Snacks */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="snacks"
                name="snacks"
                className="h-4 w-4 text-cyan-300 border-cyan-300 rounded"
              />
              <label htmlFor="snacks" className="ml-2 block text-sm text-white">
                Include Snacks
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isPending}
                className={`w-full bg-cyan-500 text-white py-3 px-4 rounded-lg hover:bg-cyan-600 transition-colors shadow-md border-2 border-cyan-400 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed  disabled:hover:bg-gray-400 disabled:border-gray-300 ${
                  isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isPending ? "Generating..." : "Generate Meal Plan"}
              </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-cyan-700">
            Weekly Meal Plan
          </h2>

          {isSuccess && data.mealPlan ? (
            <div className="h-[600px] overflow-y-auto">
              <div className="space-y-6">
                {daysOfTheWeek.map((day) => {
                  const mealPlan = getMealPlanForDay(day);
                  return (
                    <div
                      key={day}
                      className="bg-white shadow-md rounded-lg p-4 border border-cyan-200"
                    >
                      <h3 className="text-xl font-semibold mb-2 text-cyan-600">
                        {day}
                      </h3>
                      {mealPlan ? (
                        <div className="space-y-2">
                          <div>
                            <strong>Breakfast:</strong> {mealPlan.Breakfast}
                          </div>
                          <div>
                            <strong>Lunch:</strong> {mealPlan.Lunch}
                          </div>
                          <div>
                            <strong>Dinner:</strong> {mealPlan.Dinner}
                          </div>
                          {mealPlan.Snacks && (
                            <div>
                              <strong>Snacks:</strong> {mealPlan.Snacks}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500">No meal plan available.</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : isPending ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : (
            <p className="text-gray-600">
              Please generate a meal plan to see it here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
