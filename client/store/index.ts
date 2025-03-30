import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import recipeReducer from "./recipeSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    recipes: recipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
