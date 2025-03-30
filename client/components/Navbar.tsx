import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "@/http/categoryAPI";
import { RootState, AppDispatch } from "../store";
import { Dropdown, Form, Button } from "react-bootstrap";
import { fetchFilter, fetchSearch } from "@/http/recipeAPI";

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const countries = useSelector((state: RootState) => state.categories.countries);
    const ingredients = useSelector((state: RootState) => state.categories.ingredients);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCategory(dispatch);
    }, [dispatch]);

    const handleFilter = (type: string, value: string) => {
        dispatch(fetchFilter({ type, value }));
    };

    const handleSearch = () => {
        dispatch(fetchSearch(searchTerm));
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Recipe Finder</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <Dropdown className="ms-3">
                            <Dropdown.Toggle variant="success">Categories</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {categories.map((category, index) => (
                                    <Dropdown.Item key={index} onClick={() => handleFilter("category", category)}>
                                        {category}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown className="ms-3">
                            <Dropdown.Toggle variant="success">Countries</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {countries.map((country, index) => (
                                    <Dropdown.Item key={index} onClick={() => handleFilter("country", country)}>
                                        {country}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown className="ms-3">
                            <Dropdown.Toggle variant="success">Ingredients</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {ingredients.map((ingredient, index) => (
                                    <Dropdown.Item key={index} onClick={() => handleFilter("ingredient", ingredient)}>
                                        {ingredient}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </ul>

                    <Form className="d-flex ms-auto">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-success" onClick={handleSearch}>Search</Button>
                    </Form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
