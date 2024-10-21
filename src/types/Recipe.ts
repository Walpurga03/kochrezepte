export interface Recipe {
  id: string;
  name: string;
  preparationTime: number;
  ingredients: {
    amount: number;
    unit: string;
    name: string;
  }[];
  instructions: string[];
  image: string;
}