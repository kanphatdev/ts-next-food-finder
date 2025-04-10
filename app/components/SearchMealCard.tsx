import { Heart } from "lucide-react";
import { Meal } from "../util/Type";
import { useState, useEffect } from "react";
import { removeFromFavorites, addToFavorites } from "../util/Function"; // Import remove function
import Image from "next/image"; // Import Image from Next.js

type Props = {
  meal: Meal;
};

export default function SearchMealCard({ meal }: Props) {
  const [isActive, setIsActive] = useState(false);

  // Check if the meal is in the favorites list on component mount
  useEffect(() => {
    const existingFavorites = localStorage.getItem("favoriteRecipes");
    const favorites: Meal[] = existingFavorites ? JSON.parse(existingFavorites) : [];
    setIsActive(favorites.some(favorite => favorite.idMeal === meal.idMeal)); // Check if this meal is a favorite
  }, [meal]);

  const handleFavoriteClick = () => {
    if (isActive) {
      removeFromFavorites("favoriteRecipes", meal);
    } else {
      addToFavorites("favoriteRecipes", meal);
    }
    setIsActive(!isActive); // Toggle active state
  };

  return (
    <div className="card bg-base-100 shadow">
      <figure className="relative w-full h-48">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          layout="fill" // This makes the image fill the parent container
          className="object-cover rounded-t-box"
          priority // Prioritize loading the image
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-base">{meal.strMeal}</h2>
        <div className="card-actions justify-between items-center">
          <button
            className={`btn btn-primary btn-dash ${isActive ? "btn-active" : ""}`}
            onClick={handleFavoriteClick}
          >
            <Heart />
          </button>
          <a href={`/recipe/${meal.idMeal}`} className="btn btn-soft btn-success capitalize">
            view recipe
          </a>
        </div>
      </div>
    </div>
  );
}
