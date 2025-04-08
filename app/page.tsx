"use client";

import { useState } from "react";
import useSWR from "swr";
import { Meal, MealsResponse, CategoriesResponse } from "./util/Type";
import { fetcher } from "./lib/api";

import Navbar from "./components/Navbar";
import DockNavigation from "./components/DockNavigation";
import MealCard from "./components/MealCard";
import SearchCategorySection from "./components/SearchBox"; 

export default function Home() {
  const { data, error } = useSWR<CategoriesResponse>(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
    fetcher
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    data: mealsData,
    error: mealsError,
    isLoading: mealsLoading,
  } = useSWR<MealsResponse>(
    selectedCategory
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      : null,
    fetcher
  );

  return (
    <>
      <Navbar title="home" />
      <main className="p-4 space-y-6">
        <h1 className="text-3xl font-bold capitalize text-primary">
          Find and cook recipe
        </h1>

        {/* Search and Category Section */}
        <SearchCategorySection
          categories={data?.categories}
          isLoading={!data}
          error={error}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Recipes in Category */}
        {selectedCategory && (
          <fieldset className="bg-base-200 border border-base-300 rounded-box p-6 shadow-md">
            <legend className="text-base-content text-lg font-semibold px-2">
              Recipes in {selectedCategory}
            </legend>

            {mealsError && (
              <div className="text-error">Failed to load meals</div>
            )}

            {mealsLoading && (
              <div className="flex w-52 flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                  <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                  </div>
                </div>
                <div className="skeleton h-32 w-full"></div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {mealsData?.meals?.map((meal: Meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          </fieldset>
        )}
      </main>
      <DockNavigation />
    </>
  );
}
