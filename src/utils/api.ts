import { Recipe } from '../types/Recipe';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleApiResponse(response: Response) {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new ApiError(response.status, errorMessage || 'Ein unbekannter Fehler ist aufgetreten');
  }
  return response.json();
}

export const fetchRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await fetch('/kochrezepte/recipes/recipes.json');
    return handleApiResponse(response);
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`Fehler beim Abrufen der Rezepte: ${error.message}`);
    } else {
      console.error('Ein unerwarteter Fehler ist aufgetreten:', error);
    }
    throw error;
  }
};

export const fetchRecipeById = async (id: string): Promise<Recipe | null> => {
  try {
    const recipes = await fetchRecipes();
    const recipe = recipes.find(recipe => recipe.id === id);
    if (!recipe) {
      throw new ApiError(404, `Rezept mit ID ${id} nicht gefunden`);
    }
    return recipe;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`Fehler beim Abrufen des Rezepts: ${error.message}`);
    } else {
      console.error('Ein unerwarteter Fehler ist aufgetreten:', error);
    }
    throw error;
  }
};