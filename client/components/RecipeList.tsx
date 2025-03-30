import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRouter } from "next/router";
import { fetchAllRecipes, fetchFilter, fetchSearch } from "@/http/recipeAPI";

export default function RecipeList() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { country, category, ingredient, search } = router.query;

  const { recipes, loading, error } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);


  useEffect(() => {
    if (search) {
      dispatch(fetchSearch(search as string));
    }
    else if (country) {
      dispatch(fetchFilter({ type: "country", value: country as string }));
    }
    else if (category) {
      dispatch(fetchFilter({ type: "category", value: category as string }));
    }
    else if (ingredient) {
      dispatch(fetchFilter({ type: "ingredient", value: ingredient as string }));
    }
  }, [dispatch, country, category, ingredient, search]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <h1 className="text-center my-4">
        Recipes {country && `from ${country}`} {category && `in ${category}`} {ingredient && `with ${ingredient}`}
      </h1>
      <Row>
        {recipes.map((recipe) => (
          <Col key={recipe.idMeal} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card style={{ width: "18rem", cursor: "pointer" }} onClick={() => router.push(`/recipes/${recipe.idMeal}`)}>
              <Card.Img variant="top" src={recipe.strMealThumb} alt={recipe.strMeal} />
              <Card.Body>
                <Card.Title>{recipe.strMeal}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                {recipe.strArea && (
                  <ListGroup.Item>
                    <strong>Country:</strong> {recipe.strArea}
                  </ListGroup.Item>
                )}
                {recipe.strCategory && (
                  <ListGroup.Item>
                    <strong>Category:</strong> {recipe.strCategory}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
