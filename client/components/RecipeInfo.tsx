import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface RecipeDetail {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strArea: string;
    strInstructions: string;
    strCategory: string;
    [key: string]: string | null;
}

export default function RecipeInfo() {
    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
    const [categoryRecipes, setCategoryRecipes] = useState<RecipeDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                if (!id) return;
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`);
                if (!response.ok) throw new Error("Failed to fetch recipe");

                const data = await response.json();
                const meal = data.meals[0];
                setRecipe(meal);

                // Fetch recipes of the same category
                if (meal.strCategory) {
                    const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes?category=${meal.strCategory}`);
                    const categoryData = await categoryResponse.json();
                    setCategoryRecipes(categoryData.meals || []);
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!recipe) return <p>No recipe found.</p>;

    // Extract ingredients
    const ingredients = Object.keys(recipe)
        .filter((key) => key.startsWith("strIngredient") && recipe[key])
        .map((key) => recipe[key]);

    return (
        <div className="container d-flex gap-4 p-4">
            {/* Left content */}
            <div className="col-9">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="img-fluid rounded mb-3" style={{ width: "250px", height: "250px", objectFit: "cover" }} />
                <h1 className="h3 fw-bold">{recipe.strMeal}</h1>
                <p>
                    <span className="fw-medium">
                        {recipe.strArea}
                    </span>
                </p>
                <p className="mt-3">{recipe.strInstructions}</p>
                <h3 className="mt-4">Ingredients:</h3>
                <ul className="list-unstyled">
                    {ingredients.map((ingredient, index) => (
                        <li key={index} className="fw-bold">
                            {ingredient}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right sidebar */}
            <div className="col-3 border-start ps-4">
                <h3 className="h5 fw-bold">More from {recipe.strCategory}</h3>
                <ul className="list-unstyled">
                    {categoryRecipes.map((item) => (
                        <li key={item.idMeal} className="text-primary cursor-pointer" onClick={() => router.push(`/recipes/${item.idMeal}`)}>
                            {item.strMeal}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
