import { setCategories, setCountries, setIngredients } from "../store/categorySlice";
import { AppDispatch } from "@/store";

export const fetchCategory = async (dispatch: AppDispatch) => {
    try {
        const categoryRes = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
        const categoryData = await categoryRes.json();
        dispatch(setCategories(categoryData.meals.map((c: { strCategory: string }) => c.strCategory)));

        const countryRes = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        const countryData = await countryRes.json();
        dispatch(setCountries(countryData.meals.map((a: { strArea: string }) => a.strArea)));

        const ingredientRes = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        const ingredientData = await ingredientRes.json();
        dispatch(setIngredients(ingredientData.meals.map((i: { strIngredient: string }) => i.strIngredient)));
    } catch (error) {
        console.error("Помилка при отриманні даних:", error);
    }
};
