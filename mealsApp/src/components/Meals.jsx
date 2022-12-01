// import { useContext } from "react";
// import { AppContext } from "../context";
import { useGlobalContext } from "../context";
import { BsHandThumbsUp } from "react-icons/bs";

const Meals = () => {
  // destructure meals
  const { loading, meals, selectMeal, addToFavorites } = useGlobalContext();

  // {
  //   loading && (
  //     <section className="section">
  //       <h4>loading...</h4>
  //     </section>
  //   );
  // }

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (meals.length < 1) {
    return (
      <section className="section">
        <h4>No meals matched your search term.Please try again</h4>
      </section>
    );
  }
  return (
    <section className="section-center">
      {meals.map((singleMeal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;
        return (
          <article key={idMeal} className="single-meal">
            <img
              src={image}
              style={{ width: "100%" }}
              className="img"
              alt="foodPic"
              // onClick={selectMeal} don't do this
              onClick={() => selectMeal(idMeal, false)}
            />
            <footer>
              <h5>{title}</h5>
              <button className="like-btn" onClick={() => addToFavorites(idMeal)}>
                <BsHandThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
