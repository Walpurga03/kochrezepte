import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
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

  // Responsive font sizes and paddings can still be effectively managed by Chakra's useBreakpointValue
  const headingSize = useBreakpointValue({ base: 'xl', md: '2xl', lg: '3xl' });
  const textSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'xl' });
  const heroPaddingY = useBreakpointValue({ base: 6, md: 8, lg: 10 });
  const headingMarginBottom = useBreakpointValue({ base: 2, md: 3, lg: 4 });
  const vStackSpacing = useBreakpointValue({ base: 6, md: 8, lg: 10 });

  // The outer Container is removed, content will now be directly within App.tsx's .container
  return (
    <VStack spacing={vStackSpacing} align="stretch">
      <Box className="hero-section" py={heroPaddingY}>
        {/* 
          textAlign, bg, borderRadius are now handled by the "hero-section" SCSS class.
          py (vertical padding) is kept as a Chakra prop for responsive control.
        */}
        <Heading 
          as="h1" 
          size={headingSize} 
          mb={headingMarginBottom}
          className="hero-heading" // Apply SCSS class for color
          // color="brand.600" // Color is now handled by .hero-heading SCSS class
        >
          Meine Kochrezepte
        </Heading>
        <Text 
          fontSize={textSize}
          className="hero-subtext" // Apply SCSS class for color
          // color="brand.700" // Color is now handled by .hero-subtext SCSS class
        >
          Entdecken Sie köstliche Rezepte für jede Gelegenheit
        </Text>
      </Box>

      {error ? (
        <Text color="red.500" textAlign="center">{error}</Text> // Error message styling can remain specific
      ) : (
        <RecipeList recipes={recipes} />
      )}
    </VStack>
  );
};

export default Home;