import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

function MealDetails() {
    const [mealDetails, setMealDetails] = useState(null);
    const mealID = useSelector(state => state.meal.value.id);

    useEffect(() => {
        // Make the API call when the component mounts
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
            .then(response => response.json())
            .then(data => {
                setMealDetails(data.meals[0]); // Store the meal details in state
            })
            .catch(error => {
                console.error('Error fetching meal data:', error);
            });
    }, [mealID]);

    // Check if the meal data is available
    if (!mealDetails) {
        return <p>Loading...</p>;
    }

    // Extract relevant data from the response
    const {
        strMeal,
        strCategory,
        strArea,
        strInstructions,
        strMealThumb,
        strYoutube,
        ...ingredients
    } = mealDetails;

    // Filter out empty ingredient and measurement entries
    const ingredientList = Object.entries(ingredients).filter(([key, value]) =>
        key.startsWith('strIngredient') && value
    );

    return (
        <div className="flex justify-around">
        <div className="flex flex-col">
            <h1 className="text-primary-color text-center text-2xl font-bold">{strMeal}</h1>
            <p>Category: {strCategory}</p>
            <img className="rounded self-center mt-5 mb-5" src={strMealThumb} alt={strMeal} />
            <h2 className="text-primary-color mb-4 text-2xl font-bold">Ingredients:</h2>
            <ul>
                {ingredientList.map(([key, value]) => (
                    <li key={key}>
                        {value} - {ingredients[`strMeasure${key.slice(13)}`]}
                    </li>
                ))}
            </ul>
                <h2 className="text-primary-color mb-2 mt-4 text-2xl font-bold">Instructions:</h2>
            <p className="ml-6 mr-6 text-justify mb-10">{strInstructions}</p>
                <p className="ml-6 mr-6 text-justify mb-10"><a href={strYoutube}>Watch Video Here: <span className="text-blue-300">{strYoutube}</span></a></p>
        </div>
        </div>
    );
}

export default MealDetails;
