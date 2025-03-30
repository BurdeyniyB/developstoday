import Navbar from "@/components/Navbar";
import RecipeList from "../components/RecipeList";
import MainLayout from "@/layout/MainLayout";

export default function RecipesPage() {
  return (
    <MainLayout>
      <RecipeList />
    </MainLayout>);
}
