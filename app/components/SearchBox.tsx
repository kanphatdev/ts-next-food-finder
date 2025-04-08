"use client";

import { Search } from "lucide-react";
import { Category, Meal, SearchCategorySectionProps } from "../util/Type";
import useSWR from "swr";
import { useState } from "react";
import { fetcher } from "../lib/api";
import MealCard from "./MealCard";

export default function SearchCategorySection({
  categories,
  isLoading,
  error,
  selectedCategory,
  setSelectedCategory,
}: SearchCategorySectionProps) {
  const [searchValue, setSearchValue] = useState("");

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useSWR(
    searchValue.length > 0
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
      : null,
    fetcher
  );

  return (
    <fieldset className="bg-base-200 border border-base-300 rounded-box p-6 shadow-md">
      <legend className="text-base-content text-lg font-semibold px-2">
        Search Recipe
      </legend>

      {/* Search input */}
      <label className="input input-bordered flex items-center gap-2 mt-4">
        <Search className="text-primary" />
        <input
          type="search"
          placeholder="Type recipe name..."
          className="grow"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </label>

      {/* Category Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        {error && (
          <div className="text-error">
            {error instanceof Error ? error.message : "Failed to load categories"}
          </div>
        )}
        {isLoading && <span className="loading loading-ring loading-xl"></span>}
        {categories?.map((category: Category) => (
          <button
            key={category.idCategory}
            onClick={() => setSelectedCategory(category.strCategory)}
            className={`badge badge-outline hover:badge-primary ${
              selectedCategory === category.strCategory ? "badge-primary" : ""
            }`}
          >
            {category.strCategory}
          </button>
        ))}
      </div>

      {/* Search Results */}
      {searchValue && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-base-content mb-4">
            Search Results for "{searchValue}"
          </h2>

          {searchLoading && (
            <span className="loading loading-ring loading-lg"></span>
          )}

          {searchError && (
            <div className="text-error">
              {searchError instanceof Error
                ? searchError.message
                : "Failed to fetch search results"}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchData?.meals?.length > 0 ? (
              searchData.meals.map((meal: Meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))
            ) : (
              <div className="text-base-content col-span-full">
                No meals found.
              </div>
            )}
          </div>
        </div>
      )}
    </fieldset>
  );
}
