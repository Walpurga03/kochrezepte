import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Image, Heading, Text, VStack, Button, UnorderedList, ListItem, Divider } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { fetchRecipeById } from '../utils/api';
import { Recipe } from '../types/Recipe';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const loadRecipe = async () => {
      if (id) {
        const fetchedRecipe = await fetchRecipeById(id);
        setRecipe(fetchedRecipe);
      }
    };
    loadRecipe();
  }, [id]);

  if (!recipe) {
    return <Text>Rezept wird geladen...</Text>;
  }

  return (
    <Box maxWidth="800px" margin="auto" padding={4}>
      <Button leftIcon={<ChevronLeftIcon />} onClick={() => navigate(-1)} mb={4} colorScheme="orange">
        Zurück
      </Button>
      <Image src={`/images/${recipe.image}`} alt={recipe.name} width="100%" borderRadius="lg" mb={6} />
      <VStack align="start" spacing={6}>
        <Heading as="h1" size="2xl" color="brand.600">
          {recipe.name}
        </Heading>
        <Text fontSize="lg" color="brand.700">Zubereitungszeit: {recipe.preparationTime} Minuten</Text>

        <Divider />

        <Heading as="h2" size="lg" color="brand.500">Zutaten</Heading>
        <UnorderedList spacing={2}>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </ListItem>
          ))}
        </UnorderedList>

        <Divider />

        <Heading as="h2" size="lg" color="brand.500">Zubereitung</Heading>
        <UnorderedList spacing={4}>
          {recipe.instructions.map((step, index) => (
            <ListItem key={index}>{step}</ListItem>
          ))}
        </UnorderedList>
      </VStack>
    </Box>
  );
};

export default RecipeDetail;