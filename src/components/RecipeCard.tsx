import React from 'react';
import { Box, Image, Text, VStack, Badge, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const imageHeight = useBreakpointValue({ base: '150px', md: '200px', lg: '250px' });
  const fontSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'xl' });
  const padding = useBreakpointValue({ base: 2, md: 3, lg: 4 });

  return (
    <Box
      as={Link}
      to={`/recipe/${recipe.id}`}
      className="recipe-card-custom" // SCSS-Klasse hier hinzufügen
      width="100%" // Kann bleiben, wenn es spezifisch für die Karte ist
    >
      <Image
        src={`/kochrezepte/images/${recipe.image}`}
        alt={recipe.name}
        height={imageHeight}
        objectFit="cover"
        width="100%"
      />
      <VStack p={padding} align="start" spacing={2}>
        <Text
          fontWeight="bold" // Kann bleiben oder Teil von .card-title in SCSS sein
          fontSize={fontSize} // Kann bleiben oder Teil von .card-title in SCSS sein
        >
          {recipe.name}
        </Text>
        <Badge colorScheme="orange" fontSize={{ base: 'xs', md: 'sm' }}>
          {recipe.preparationTime} Minuten
        </Badge>
      </VStack>
    </Box>
  );
};

export default RecipeCard;