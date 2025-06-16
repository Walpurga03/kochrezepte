import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import theme from './theme'; // Ihr Chakra UI Theme bleibt wichtig für Design Tokens
import Home from './pages/Home';
import RecipeDetail from './components/RecipeDetail';
// Stellen Sie sicher, dass main.scss global importiert wird, typischerweise in main.tsx

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      {/* 
        Die Box verwendet jetzt die .container Klasse aus Ihrer main.scss.
        Die vorherigen Props maxWidth, margin und padding wurden entfernt,
        da diese Stile nun von der SCSS-Klasse .container bereitgestellt werden.
        Beachten Sie, dass das Padding sich von 16px (Chakra p={4}) auf 24px (SCSS $spacing-md) ändert.
      */}
      <Box className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
};

export default App;