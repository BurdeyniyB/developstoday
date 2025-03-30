import { createAsyncThunk } from "@reduxjs/toolkit";
import { log } from "console";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAllRecipes = createAsyncThunk(
  "recipes/fetchAllRecipes",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/recipes`);
      const data = await response.json();
      console.log(data); // This helps to inspect the response in the console.
      return data.meals || [];
    } catch (error) {
      console.log(error); // To see if there are any specific errors
      return thunkAPI.rejectWithValue("Помилка отримання всіх рецептів");
    }
  }
);

export const fetchFilter = createAsyncThunk(
  "recipes/fetchFilter",
  async ({ type, value }: { type: string; value: string }, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/recipes?filter=${type}&value=${value}`);
      const data = await response.json();

      return data.meals || []; 
    } catch (error) {
      return thunkAPI.rejectWithValue("Помилка отримання рецептів");
    }
  }
);

export const fetchSearch = createAsyncThunk(
  "recipes/fetchSearch",
  async (query: string, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/recipes/search?query=${query}`);
      const data = await response.json();

      return data.meals || []; 
    } catch (error) {
      return thunkAPI.rejectWithValue("Помилка пошуку рецептів");
    }
  }
);
