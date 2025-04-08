"use client";
import Image from "next/image";
import { Meal } from "../util/Type";
import { Utensils } from "lucide-react";

type MealCardProps = {
  meal: Meal;
};

export default function MealCard({ meal }: MealCardProps) {
  return (
    <div className="card bg-base-100 shadow">
      <figure className="relative w-full h-48">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          className="object-cover rounded-t-box"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-base">{meal.strMeal}</h2>
        <div className="card-actions">
        <button className="btn btn-soft btn-accent capitalize">view recipe<Utensils /> </button>
        </div>
      </div>
    </div>
  );
}
