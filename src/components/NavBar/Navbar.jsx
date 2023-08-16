import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { selectedCategory } from '../../redux/category';
const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    

    useEffect(() => {
        // Fetch categories from the API
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(response => response.json())
            .then(data => {
                // Extract and store category information
                const extractedCategories = data.categories.map(category => ({
                    id: category.idCategory,
                    name: category.strCategory
                }));
                setCategories(extractedCategories);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const toggleDropdown = (categoryId, categoryName) => {
        setIsDropdownOpen(!isDropdownOpen);
        setSelectedCategoryId(categoryId);
        dispatch(selectedCategory({ id: categoryId, cat: categoryName }));
        console.log(categoryId) // Dispatch the action with the selected category ID
    };

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 right-0">
            <div className="container flex flex-col sm:flex-row justify-between items-center p-4">
                <div className="text-2xl font-bold ml-0 md:ml-5 text-primary-color mb-2 sm:mb-0">Recipe Finder</div>
                <div className="relative mb-2 sm:mb-0">
                    <button
                        className="text-primary-color hover:text-primary-hover focus:outline-none"
                        onClick={toggleDropdown}
                    >
                        Categories
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute z-10 mt-2 py-2 w-40 bg-white rounded-lg shadow-md">
                            <ul className="block px-4 py-2 text-gray-800 ">
                                {categories.map(category => (
                                    <li
                                        className='hover:bg-primary-color hover:text-white hover:cursor-pointer w-full'
                                        key={category.id}
                                        onClick={() => toggleDropdown(category.id, category.name)} // Pass the category ID to the toggleDropdown function
                                    >
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-primary-color" />
                    </span>
                    <input
                        className="py-1 pl-10 pr-4 rounded-full border-primary-color border placeholder-primary-color placeholder-text-xs placeholder-opacity-50 focus:outline-none"
                        type="text"
                        placeholder="Search recipe"
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
