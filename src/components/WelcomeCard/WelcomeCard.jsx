import React from 'react';
import { useState } from 'react';
import { useDispatch } from "react-redux"; //used for modifying values on our states
import { login } from "../../redux/user";

const WelcomeCard = ({ onClose }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const handleName =(e) => {
        setName(e.target.value)
    }
    const handleSubmit = (e) => {
        dispatch(login({ name: name }));
        onClose()
    }

    return (
        <div className="bg-white p-6 w-full  rounded-lg ">
            <h2 className="text-3xl mb-4 font-bold text-primary-color text-center mb-4">Recipe</h2>
            <p className="text-gray-600 mb-4 text-center">Who is visiting us today?</p>
            <div className="relative mb-4">
                <input
                    className="py-1 px-4 rounded-full border-yellow-400 border placeholder-primary-color placeholder-opacity-50 focus:outline-none w-full"
                    type="text"
                    placeholder="Enter your name"
                    onChange={handleName}
                    value={name}
                />
            </div>
            <button className="bg-primary-color hover:bg-yellow-500 text-white py-2 px-4 rounded-full focus:outline-none w-full"
                onClick={handleSubmit}
            >
                Send
            </button>
        </div>
    );
};

export default WelcomeCard;
