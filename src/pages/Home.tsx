import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, Container, useBreakpointValue } from '@chakra-ui/react';
import RecipeList from '../components/RecipeList';
import { fetchRecipes } from '../utils/api';
import { Recipe } from '../types/Recipe';

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipes();
        setRecipes(fetchedRecipes);
      } catch (err) {
        setError('Fehler beim Laden der Rezepte. Bitte versuchen Sie es später erneut.');
        console.error('Error fetching recipes:', err);
      }
    };
    loadRecipes();
  }, []);

  const headingSize = useBreakpointValue({ base: 'xl', md: '2xl', lg: '3xl' });
  const textSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'xl' });
  const containerWidth = useBreakpointValue({ base: '100%', md: '90%', lg: '80%', xl: '1200px' });

  return (
    <Container maxWidth={containerWidth} px={{ base: 4, md: 6, lg: 8 }}>
      <VStack spacing={{ base: 6, md: 8, lg: 10 }} align="stretch">
        <Box textAlign="center" py={{ base: 6, md: 8, lg: 10 }} bg="brand.50" borderRadius="lg">
          <Heading as="h1" size={headingSize} color="brand.600" mb={{ base: 2, md: 3, lg: 4 }}>
            Meine Kochrezepte
          </Heading>
          <Text fontSize={textSize} color="brand.700">
            Entdecken Sie köstliche Rezepte für jede Gelegenheit
          </Text>
        </Box>

        {error ? (
          <Text color="red.500" textAlign="center">{error}</Text>
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </VStack>
    </Container>
  );
};

export default Home;