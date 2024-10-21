import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import theme from './theme';
import Home from './pages/Home';
import RecipeDetail from './components/RecipeDetail';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box maxWidth="1200px" margin="auto" padding={4}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;