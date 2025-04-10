"use client";
import { fetcher } from "@/app/lib/api";
import { ArrowLeft, Clapperboard } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";

const RecipeDetail = () => {
  const params = useParams();
  const { data, error } = useSWR(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>
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
  </div>;

  const meal = data.meals[0];

  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = meal[`strIngredient${i + 1}`];
    const measure = meal[`strMeasure${i + 1}`];
    return ingredient && ingredient.trim() !== ""
      ? { ingredient, measure }
      : null;
  }).filter(Boolean);

  const tags = meal.strTags?.split(",") ?? [];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="card lg:card-side bg-base-100 shadow-sm">
      <figure className="relative w-full lg:w-1/2 aspect-square lg:aspect-auto">
  <Image
    src={meal.strMealThumb}
    alt={meal.strMeal}
    fill
    className="object-cover rounded-l-box"
    sizes="(max-width: 1024px) 100vw, 50vw"
  />
</figure>


        <div className="card-body w-full lg:w-1/2">
        <div className="flex justify-between">

          <Link href={".."}>
          <ArrowLeft />
          </Link>
          <h2 className="card-title">{meal.strMeal}</h2>
        </div>

          {/* Ingredients */}
          <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend capitalize">Ingredients</legend>
            <ul className="list bg-base-100 rounded-box shadow-md">
              {ingredients.map((item, index) => (
                <li
                  key={index}
                  className="list-row flex items-center justify-between gap-2 py-1 px-2"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      className="size-10 rounded-box"
                      src={`https://www.themealdb.com/images/ingredients/${item!.ingredient}.png`}
                      alt={item!.ingredient}
                      width={40}
                      height={40}
                    />
                    <div>
                      <div>{item!.ingredient}</div>
                      <div className="text-xs uppercase font-semibold opacity-60">
                        {item!.measure}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="card-actions justify-end mt-4">
              <Link
                href={meal.strYoutube || "#"}
                target="_blank"
                className="btn btn-primary capitalize"
              >
                Recipe Video <Clapperboard size={15} />
              </Link>
            </div>

            <div className="card-actions justify-start mt-2">
              <div className="badge badge-soft badge-info">
                {meal.strCategory}
              </div>
            </div>
          </fieldset>

          {/* Description */}
          <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box mt-4">
            <legend className="fieldset-legend capitalize">Recipe Description</legend>
            <p className="text-sm whitespace-pre-line">{meal.strInstructions}</p>

            <div className="card-actions justify-start mt-4 gap-2 flex-wrap">
              {tags.map((tag:string, i:number) => (
                <div key={i} className="badge badge-soft badge-secondary">
                  {tag}
                </div>
              ))}
            </div>

            <div className="card-actions justify-end mt-4">
              <div className="badge badge-soft badge-success">{meal.strArea}</div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
