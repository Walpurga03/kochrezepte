import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#FFF3E0", // Lightest orange - good for backgrounds or subtle highlights
      100: "#FFE0B2",
      200: "#FFCC80",
      300: "#FFB74D",
      400: "#FFA726",
      500: "#FF9800", // Primary brand color
      600: "#FB8C00", // Darker shade for text or active elements
      700: "#F57C00",
      800: "#EF6C00",
      900: "#E65100", // Darkest orange
    },
    neutral: { // Adding a neutral palette for text, backgrounds, borders
      50: "#F7FAFC", // Very light gray, good for page backgrounds
      100: "#EDF2F7", // Light gray, for card backgrounds or dividers
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0", // Medium gray, for secondary text
      500: "#718096",
      600: "#4A5568", // Dark gray, for primary text
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    }
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Open Sans', sans-serif",
  },
  styles: { // Adding global styles
    global: {
      body: {
        bg: "neutral.50", // Set a default background color for the app
        color: "neutral.800", // Set a default text color
      },
      a: { // Example: style links to use brand color
        color: "brand.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
  space: {
    // ... Ihre existierenden space tokens ...
    '10': '2.5rem', // 40px, falls Ihre Basis 1rem = 16px ist und Sie eine numerische Skala verwenden
                   // (Chakra's default space unit is 0.25rem, so space={10} is 2.5rem)
    'gridGap': '40px', // Oder ein benannter Token
  },
});

export default theme;