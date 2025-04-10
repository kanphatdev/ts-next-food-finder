"use client";

import { Heart, SearchIcon, Utensils } from "lucide-react";
import DockNavigation from "../components/DockNavigation";
import useSWR from "swr";
import { useState } from "react";
import Link from "next/link";
import { fetcher } from "../lib/api";
import { MealsResponse } from "../util/Type";

const Search = () => {
  const [searchRecipe, setSearchRecipe] = useState("");
  const [searchArea, setSearchArea] = useState("");

  const {
    data: recipeData,
    error: recipeError,
    isLoading: recipeLoading,
  } = useSWR<MealsResponse>(
    searchRecipe ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchRecipe}` : null,
    fetcher
  );

  const {
    data: areaData,
    error: areaError,
    isLoading: areaLoading,
  } = useSWR<MealsResponse>(
    searchArea ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchArea}` : null,
    fetcher
  );

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold capitalize text-primary">Search</h1>

      <div className="flex flex-wrap gap-6">
        {/* Search by Area */}
        <fieldset className="bg-base-200 border border-base-300 p-4 rounded-box w-full md:w-[45%]">
          <legend className="text-lg font-semibold">Search by Area</legend>
          <div className="join mt-2">
            <input
              type="text"
              className="input join-item"
              placeholder="e.g. Canadian"
              onChange={(e) => setSearchArea(e.target.value)}
            />
            <button className="btn join-item">
              <SearchIcon />
            </button>
          </div>
        </fieldset>

        {/* Search by Recipe */}
        <fieldset className="bg-base-200 border border-base-300 p-4 rounded-box w-full md:w-[45%]">
          <legend className="text-lg font-semibold">Search by Recipe Name</legend>
          <div className="join mt-2">
            <input
              type="text"
              className="input join-item"
              placeholder="e.g. Arrabiata"
              onChange={(e) => setSearchRecipe(e.target.value)}
            />
            <button className="btn join-item">
              <SearchIcon />
            </button>
          </div>
        </fieldset>
      </div>

      {/* Loading states */}
      {recipeLoading && (
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
      {areaLoading && (
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

       {/* Display Results */}
       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {(recipeData?.meals || areaData?.meals)?.map((meal) => (
          <div className="card bg-base-100 shadow-sm" key={meal.idMeal}>
            <figure>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{meal.strMeal}</h2>

              <div className="card-actions justify-between items-center">
                <button className="btn btn-primary btn-dash">
                  <Heart />
                </button>
                <Link
                  href={`/recipe/${meal.idMeal}`}
                  className="btn btn-soft btn-success capitalize"
                >
                  view recipe <Utensils />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {(searchRecipe || searchArea) &&
        !recipeLoading &&
        !areaLoading &&
        (recipeData?.meals === null && areaData?.meals === null) && (
          <div className="text-center text-lg text-gray-500 font-medium">
            No results found.
          </div>
      )}


      {/* Errors */}
      {(recipeError || areaError) && (
        <div className="text-error">Failed to load results.</div>
      )}

      <DockNavigation />
    </div>
  );
};

export default Search;
