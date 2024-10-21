import { Recipe } from '../types/Recipe';

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch('/recipes/recipes.json');
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return response.json();
};

export const fetchRecipeById = async (id: string): Promise<Recipe | null> => {
  const recipes = await fetchRecipes();
  return recipes.find(recipe => recipe.id === id) || null;
};