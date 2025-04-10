"use client";
import Image from "next/image";
import { Meal } from "../util/Type";
import { Heart, Utensils } from "lucide-react";
import Link from "next/link";
import { addToFavorites, removeFromFavorites } from "../util/Function"; // Import remove function
import { useState, useEffect } from "react";

type MealCardProps = {
  meal: Meal;
};

export default function MealCard({ meal }: MealCardProps) {
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
          sizes="(max-width: 768px) 100vw, 33vw" // Make image responsive
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
          <Link
            href={`/recipe/${meal.idMeal}`}
            className="btn btn-soft btn-accent capitalize"
          >
            view recipe <Utensils />
          </Link>
        </div>
      </div>
    </div>
  );
}
