import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "../services/api";

const RestaurantForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Make a POST request to add a new restaurant
    axios.post("/restaurants", formData).then((response) => {
      console.log(response.data);
      // Clear the form fields
      setFormData({
        name: "",
        address: "",
        contact: "",
      });
      // You can update the state or trigger a refetch of the restaurant list
    });
  };
  

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      <h2>Add New Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button variant="contained" type="submit" color="primary">
          Add Restaurant
        </Button>
      </form>
    </Box>
  );
};

export default RestaurantForm;
