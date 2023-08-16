import { useState } from "react";
import { useDispatch } from "react-redux";
import { food } from "../redux/meals";

function MealButton({ meal, onOpen }) {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(food({ id: meal.id, name: meal.name }));
        onOpen();
    };

    return (
        <button
            key={meal.id}
            className="block px-4 py-2 text-gray-800 hover:bg-primary-color hover:cursor-pointer hover:text-white w-full text-center"
            onClick={handleClick}
        >
            {meal.name}
        </button>
    );
}

export default MealButton;
