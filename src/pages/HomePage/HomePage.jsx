import React from "react"
import Navbar from "../../components/NavBar/Navbar"
import Footer from "../../components/Footer/Footer"
import WelcomeCard from "../../components/WelcomeCard/WelcomeCard"
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import "../HomePage.css"
import MealButton from "../../components/MealBtn";
import MealDetails from "../../components/recipeCard";
function HomePage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);
    const meal = useSelector(state => state.meal.value);
    const category = useSelector(state => state.category.value);
    const name = user.name
    const [isModalOpen, setIsModalOpen] = useState(!user.name);
    const [recipeList, setIsRecipeListOpen] = useState(false);

    // const [isCategorySelected, setisCategorySelected] = useState(!category.id);
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const openRecipeModal = () => {
        setIsRecipeListOpen(true);
    };
    const closeRecipeModal = () => {
        setIsRecipeListOpen(false);
    };

    const [meals, setMeals] = useState([]);


    useEffect(() => {
        // Fetch meals for the selected category
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.cat}`)
            .then(response => response.json())
            .then(data => {
                const extractedMeals = data.meals.map(meal => ({
                    id: meal.idMeal,
                    name: meal.strMeal
                }));
                setMeals(extractedMeals);
            })
            .catch(error => {
                console.error('Error fetching meals:', error);
            });
    }, [category.cat]);
    return (
        <div className="page-container">
            <Navbar />
            <div className="content-container">
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <WelcomeCard onClose={closeModal} />
                </Modal>
                <div className="flex justify-around h-full items-center">

                    <div className="ml-4 mt-20 pt-20 mr-4">
                        <p className="text-center font-bold text-3xl">Hello <span className="text-primary-color">{name}!</span></p>
                        <p className="text-center  text-2xl mt-10 mb-10">Explore a wide range of recipes and begin your cooking journey😎🎉</p>
                        {category.id === null && (<p className="text-center  text-2xl">Select a category from the navigation bar to get started</p>)}
                        {category.id !== null && (<p className="text-center  text-2xl">You selected <span className="text-primary-color">{category.cat}</span>. Here are the meals under this category</p>)}
                        {category.id !== null && (<p className="text-center  text-2xl">Click on any to get the full recipe</p>)}
                        {category.id !== null && (<div className="mt-10 mb-6">
                            {meals.map((meal) => (
                                <MealButton key={meal} meal={meal} onOpen={openRecipeModal} />
                            ))}

                        </div>)}
                        <Modal
                            isOpen={recipeList}
                            onRequestClose={closeModal}
                            className="modal-content"
                            overlayClassName="modal-overlay"
                        >
                            <div className="meal-details">
                                <MealDetails />
                            </div>
                            <div className="flex justify-around">

                                <button onClick={closeRecipeModal} className="bg-red-500 py-2 px-4 rounded text-white">close</button>
                            </div>
                        </Modal>
                    </div>
                </div>
                {/* recipe Modal */}
                <Modal>

                </Modal>
            </div>
            <footer className="footer">

                <Footer />
            </footer>
        </div>
    )
}
export default HomePage