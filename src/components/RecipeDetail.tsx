import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Image, Heading, Text, VStack, Button, UnorderedList, ListItem, Divider,
  Spinner, Alert, AlertIcon, AlertTitle, AlertDescription,
  // Card, CardHeader, CardBody // Werden durch Box mit SCSS-Klassen ersetzt
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { fetchRecipeById } from '../utils/api';
import { Recipe } from '../types/Recipe';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipe = async () => {
      if (id) {
        try {
          setLoading(true);
          setError(null);
          const fetchedRecipe = await fetchRecipeById(id);
          setRecipe(fetchedRecipe);
        } catch (err: any) {
          setError(err.message || 'Rezept konnte nicht geladen werden.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Keine Rezept-ID vorhanden.');
        setLoading(false);
      }
    };
    loadRecipe();
  }, [id]);

  // Lade- und Fehlerzustände bleiben gleich (bereits gut implementiert)
  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color="brand.500" /> {/* Farbe kann aus Chakra Theme bleiben */}
        <Text mt={4}>Rezept wird geladen...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        borderRadius="md" // Kann bleiben oder durch SCSS-Variable ersetzt werden
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Fehler
        </AlertTitle>
        <AlertDescription maxWidth="sm">{error}</AlertDescription>
        <Button onClick={() => navigate('/')} mt={4} colorScheme="orange"> {/* Chakra Button Styling ist oft gut so */}
          Zur Startseite
        </Button>
      </Alert>
    );
  }

  if (!recipe) {
    return <Text>Rezept nicht gefunden.</Text>;
  }

  return (
    // Responsive maxWidth und margin="auto" für Zentrierung können bleiben.
    // Responsive padding kann auch bleiben.
    <Box 
      className="recipe-detail-page" 
      maxWidth="800px" 
      margin="auto" 
      padding={{ base: 3, md: 6 }} // Leicht erhöhtes Padding für mehr Weißraum
    >
      <Button 
        leftIcon={<ChevronLeftIcon />} 
        onClick={() => navigate(-1)} 
        mb={{ base: 4, md: 6 }} // Responsive margin-bottom
        variant="outline" // Chakra Button Variante
        className="button-outline" // Verwendung der globalen SCSS-Button-Klasse
      >
        Zurück
      </Button>

      <Box className="recipe-detail-image-wrapper">
        <Image
          className="recipe-detail-image"
          src={`/kochrezepte/images/${recipe.image}`}
          alt={recipe.name}
          // Props wie width, maxHeight, objectFit, borderRadius, boxShadow, mb werden durch SCSS ersetzt
        />
      </Box>

      <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
        <Heading
          as="h1"
          className="recipe-title"
          // size, color, textAlign, mb werden durch SCSS oder globale h1-Stile ersetzt/ergänzt
          // Chakra's `size` prop für Heading kann für responsive Schriftgrößen beibehalten werden,
          // wenn es nicht vollständig durch globale h1 SCSS-Regeln abgedeckt ist.
          // Für dieses Beispiel nehmen wir an, globale h1-Stile + .recipe-title reichen.
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} // Responsive Größe über Chakra
        >
          {recipe.name}
        </Heading>
        <Text
          className="preparation-time"
          // fontSize, color, textAlign werden durch SCSS ersetzt
        >
          Zubereitungszeit: {recipe.preparationTime} Minuten
        </Text>

        <Divider my={{ base: 4, md: 6 }} />

        {/* Zutaten-Karte */}
        <Box className="section-card">
          <Box className="section-card-header">
            <Heading as="h2">Zutaten</Heading> {/* Globale h2-Stile + .section-card-header h2 greifen */}
          </Box>
          <Box className="section-card-body">
            <UnorderedList> {/* Globale ul/li-Stile greifen */}
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Box>

        {/* Zubereitungs-Karte */}
        <Box className="section-card">
          <Box className="section-card-header">
            <Heading as="h2">Zubereitung</Heading>
          </Box>
          <Box className="section-card-body">
            <UnorderedList>
              {recipe.instructions.map((step, index) => (
                <ListItem key={index}>
                  {index + 1}. {step}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default RecipeDetail;