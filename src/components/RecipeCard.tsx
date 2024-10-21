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
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
      width="100%"
    >
      <Image
        src={`/kochrezepte/images/${recipe.image}`}
        alt={recipe.name}
        height={imageHeight}
        objectFit="cover"
        width="100%"
      />
      <VStack p={padding} align="start" spacing={2}>
        <Text fontWeight="bold" fontSize={fontSize} color="brand.600">
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