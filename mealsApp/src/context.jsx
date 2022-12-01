import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();
const alllMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem("favorites");
  if (favorites) {
    // variable yg sudah di stringify ketika ingin diget harus diparse :
    favorites = JSON.parse(localStorage.getItem("favorites"));
  } else {
    favorites = [];
  }
  return favorites;
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      // destructuring
      const { data } = await axios.get(url);
      {
        data.meals ? setMeals(data.meals) : setMeals([]);
      }
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  };

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };
  // memakai 2 kemungkinan :
  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToFavorites = (idMeal) => {
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updateFavorites = [...favorites, meal];
    setFavorites(updateFavorites);
    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
  };

  const removeFromFavorites = (idMeal) => {
    const updateFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updateFavorites);
    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
  };

  useEffect(() => {
    fetchMeals(alllMealsUrl);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(`${alllMealsUrl}${searchTerm}`);
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
        addToFavorites,
        removeFromFavorites,
        favorites,
      }}
      style={{ height: "max-content" }}
    >
      {children}
    </AppContext.Provider>
  );
};
// custom hook :
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
