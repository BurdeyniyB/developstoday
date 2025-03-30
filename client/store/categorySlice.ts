import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  categories: string[];
  countries: string[];
  ingredients: string[];
}

const initialState: CategoryState = {
  categories: [],
  countries: [],
  ingredients: [],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload;
    },
    setIngredients(state, action: PayloadAction<string[]>) {
      state.ingredients = action.payload;
    },
  },
});

export const { setCategories, setCountries, setIngredients } = categorySlice.actions;
export default categorySlice.reducer;
