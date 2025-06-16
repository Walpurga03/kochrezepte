import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/Recipe';

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing="gridGap"> {/* Theme-Token verwenden */}
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </SimpleGrid>
  );
};

export default RecipeList;