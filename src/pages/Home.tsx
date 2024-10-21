import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import RecipeList from '../components/RecipeList';
import { fetchRecipes } from '../utils/api';
import { Recipe } from '../types/Recipe';

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const loadRecipes = async () => {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
    };
    loadRecipes();
  }, []);

  return (
    <VStack spacing={8} align="stretch">
      <Box textAlign="center" py={10} bg="brand.50" borderRadius="lg">
        <Heading as="h1" size="2xl" color="brand.600">
          Meine Kochrezepte
        </Heading>
        <Text mt={4} fontSize="xl" color="brand.700">
          Entdecken Sie köstliche Rezepte für jede Gelegenheit
        </Text>
      </Box>
      <RecipeList recipes={recipes} />
    </VStack>
  );
};

export default Home;