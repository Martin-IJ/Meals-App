import React, { useState } from "react";
import { useGlobalContext } from "../Context";
import { BsHandThumbsUp } from "react-icons/bs";
import loadingImg from "../assets/loading.gif";

const Meals = () => {
  const { meals, loading, selectMeal, addToFavourites } = useGlobalContext();

  if (loading) {
    return (
      <section style={{ textAlign: "center" }} className="section">
        <img src={loadingImg} alt="" />
        <h4>Loading...</h4>
      </section>
    );
  }

  if (meals.length < 1) {
    return (
      <section style={{ textAlign: "center" }} className="section">
        <h4>No meals matched your search term. Please try again.</h4>
      </section>
    );
  }

  return (
    <section className="section-center">
      {meals.map((singleMeal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;

        return (
          <article key={idMeal} className="single-meal">
            <img src={image} className="img" alt="" onClick={() => selectMeal(idMeal)} />
            <footer>
              <h5>{title}</h5>
              <button className="like-btn" onClick={() => addToFavourites(idMeal)}>
                {" "}
                <BsHandThumbsUp />{" "}
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
