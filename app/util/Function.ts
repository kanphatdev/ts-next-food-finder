"use client "; 
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });
  useEffect(() => {
  localStorage.setItem(key,JSON.stringify(value))
  }, [key,value])
  return [value,setValue] as [typeof value, typeof setValue]
}
export function addToFavorites<T>(key: string, item: T) {
    const existingFavorites = localStorage.getItem(key);
    const favorites: T[] = existingFavorites ? JSON.parse(existingFavorites) : [];
    if (!favorites.some(favorite => JSON.stringify(favorite) === JSON.stringify(item))) {
        favorites.push(item);
        localStorage.setItem(key, JSON.stringify(favorites));
    }
}
export function removeFromFavorites<T>(key: string, item: T) {
    const existingFavorites = localStorage.getItem(key);
    const favorites: T[] = existingFavorites ? JSON.parse(existingFavorites) : [];
    const updatedFavorites = favorites.filter(favorite => JSON.stringify(favorite) !== JSON.stringify(item));
    localStorage.setItem(key, JSON.stringify(updatedFavorites));
}
