import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const getFavoritesFromLocalStorage = () => {
  let favourites = localStorage.getItem("favourites");

  if (favourites) {
    favourites = JSON.parse(localStorage.getItem("favourites"));
  } else {
    favourites = [];
  }
  return favourites;
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setselectedMeal] = useState(null);
  const [favourites, setFavourites] = useState(getFavoritesFromLocalStorage());

  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios(url);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  const selectMeal = (idMeal, favouriteMeal) => {
    // if(selectMeal){
    //   document.body.style.overflow = 'hidden'
    // } else {
    //   document.body.style.overflow = 'scroll'
    // }

    let meal;
    if (favouriteMeal) {
      meal = favourites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setselectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToFavourites = (idMeal) => {
    const alreadyFavourite = favourites.find((meal) => meal.idMeal === idMeal);

    if (alreadyFavourite) return;

    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updateFavourites = [...favourites, meal];
    setFavourites(updateFavourites);
    localStorage.setItem("favourites", JSON.stringify(updateFavourites));
  };
  const removeFromFavourites = (idMeal) => {
    const updateFavourites = favourites.filter(
      (meal) => meal.idMeal !== idMeal
    )
    setFavourites(updateFavourites)
    localStorage.setItem("favourites", JSON.stringify(updateFavourites));
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        loading,
        meals,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectedMeal,
        selectMeal,
        closeModal,
        addToFavourites,
        removeFromFavourites,
        favourites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
