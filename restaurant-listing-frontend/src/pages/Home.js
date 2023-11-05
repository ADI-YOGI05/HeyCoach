// src/pages/Home.js

import React from "react";
import RestaurantList from "../components/RestaurantList";
import RestaurantForm from "../components/RestaurantForm";

const Home = () => {
  return (
    <div>
      <RestaurantForm />
      <RestaurantList />
    </div>
  );
};

export default Home;
