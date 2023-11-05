import React, { useState, useEffect } from "react";
import axios from "../services/api";
import RestaurantItem from "./RestaurantItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    // Function to fetch restaurants from the backend
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("/restaurants");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants(); // Initial fetch

    // Set up an interval to automatically refresh every 10 seconds (adjust as needed)
    const refreshInterval = setInterval(() => {
      fetchRestaurants();
    }, 10000); // 10 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(refreshInterval);
  }, [refreshFlag]);

  return (
    <Paper elevation={3} style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Restaurant List
      </Typography>
      <List>
        {restaurants.map((restaurant) => (
          <ListItem key={restaurant.id}>
            <RestaurantItem restaurant={restaurant} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RestaurantList;
