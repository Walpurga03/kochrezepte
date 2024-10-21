import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import theme from './theme';
import Home from './pages/Home';
import RecipeDetail from './components/RecipeDetail';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box maxWidth="1200px" margin="auto" padding={4}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
};

export default App;