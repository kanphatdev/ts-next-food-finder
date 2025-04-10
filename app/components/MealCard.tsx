"use client";
import Image from "next/image";
import { Meal } from "../util/Type";
import { Heart, Utensils } from "lucide-react";
import Link from "next/link";

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

        <div className="card-actions justify-between items-center">
          <button className="btn btn-primary btn-dash">
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
