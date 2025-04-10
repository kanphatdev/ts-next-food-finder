"use client";

import { useEffect, useState } from "react";
import DockNavigation from "../components/DockNavigation";
import { Meal } from "../util/Type";
import SearchMealCard from "../components/SearchMealCard";
import Navbar from "../components/Navbar";

const Favoritespage = () => {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favoriteRecipes");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="p-6 space-y-8">
      <Navbar title="Favorites" /> 
      <div className="bg-base-200 border border-base-300 rounded-box p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-primary">Favorite Recipes</h2>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">No favorite recipes yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {favorites.map((meal) => (
              <SearchMealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </div>

      <DockNavigation />
    </div>
  );
};

export default Favoritespage;
