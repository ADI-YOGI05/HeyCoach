import React, { useState } from "react";
import axios from "../services/api";
import { Card, CardContent, Typography, Button, TextField } from "@mui/material";

const RestaurantItem = ({ restaurant }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: restaurant.name,
    address: restaurant.address,
    contact: restaurant.contact,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset edited data
    setEditedData({
      name: restaurant.name,
      address: restaurant.address,
      contact: restaurant.contact,
    });
  };

  const handleUpdate = () => {
    // Make a PUT request to update the restaurant
    axios
      .put(`/restaurants/${restaurant.id}`, editedData)
      .then((response) => {
        console.log(response.data);
        setIsEditing(false);
        // You can update the state or trigger a refetch of the restaurant list
      })
      .catch((error) => {
        console.error(error);
        // Handle errors, e.g., show an error message to the user
      });
  };

  const handleDelete = () => {
    // Make a DELETE request to delete the restaurant
    axios
      .delete(`/restaurants/${restaurant.id}`)
      .then((response) => {
        console.log(response.data);
        // You can update the state or trigger a refetch of the restaurant list
      })
      .catch((error) => {
        console.error(error);
        // Handle errors, e.g., show an error message to the user
      });
  };

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {restaurant.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {restaurant.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact: {restaurant.contact}
        </Typography>

        {isEditing ? (
          <div>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={editedData.name}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={editedData.address}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Contact"
              name="contact"
              value={editedData.contact}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <Button variant="contained" onClick={handleUpdate} color="primary" sx={{ marginRight: 1 }}>
              Update
            </Button>
            <Button variant="contained" onClick={handleCancelEdit} color="secondary">
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            <Button variant="contained" onClick={handleEdit} sx={{ marginRight: 1 }}>
              Edit
            </Button>
            <Button variant="contained" onClick={handleDelete} color="error">
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RestaurantItem;
