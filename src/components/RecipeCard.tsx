import React from 'react';
import { Box, Image, Text, VStack, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Box
      as={Link}
      to={`/recipe/${recipe.id}`}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
    >
      <Image src={`/images/${recipe.image}`} alt={recipe.name} height="200px" objectFit="cover" width="100%" />
      <VStack p={4} align="start" spacing={2}>
        <Text fontWeight="bold" fontSize="xl" color="brand.600">
          {recipe.name}
        </Text>
        <Badge colorScheme="orange">
          {recipe.preparationTime} Minuten
        </Badge>
      </VStack>
    </Box>
  );
};

export default RecipeCard;