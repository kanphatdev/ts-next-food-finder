import { Dispatch, SetStateAction } from "react";

// types/navbar.ts
export type NavbarProps = {
    title: string
  }
  
// ประเภทข้อมูลจาก TheMealDB API
export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type CategoriesResponse = {
  categories: Category[];
};
// 👇 Type สำหรับ /filter.php?c=
export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export type MealsResponse = {
  meals: Meal[];
};
export interface SearchCategorySectionProps {
  categories: Category[] | undefined;
  isLoading: boolean;
  error: unknown;
  selectedCategory: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
}