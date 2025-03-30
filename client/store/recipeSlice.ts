import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllRecipes, fetchFilter, fetchSearch } from "@/http/recipeAPI"; // Підключаємо всі необхідні асинхронні дії

export interface RecipesState {
  recipes: any[];
  country?: string;
  category?: string;
  ingredient?: string;
  search?: string;
  loading: boolean;
  error?: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;  // Якщо запит у процесі, то очищаємо помилки
      })
      .addCase(fetchAllRecipes.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.recipes = action.payload; // Оновлюємо список рецептів після успішного отримання
      })
      .addCase(fetchAllRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка отримання всіх рецептів"; // Якщо сталася помилка
      })
      .addCase(fetchFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilter.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка отримання рецептів";
      })
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка пошуку рецептів";
      });
  },
});

export default recipeSlice.reducer;
