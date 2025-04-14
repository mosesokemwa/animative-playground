import { Cuisines } from "@/utils/constants";
import { useState, useCallback } from "react";

export const useCuisines = () => {
  const [cuisines, setCuisines] = useState(Cuisines);

  const toggleCuisine = useCallback((id: number) => {
    setCuisines((prevCuisines) => {
      return prevCuisines.map((cuisine) => {
        if (cuisine.id === id) {
          return { ...cuisine, selected: !cuisine.selected };
        }
        return cuisine;
      });
    });
  }, []);

  return {
    cuisines,
    toggleCuisine,
  };
};
