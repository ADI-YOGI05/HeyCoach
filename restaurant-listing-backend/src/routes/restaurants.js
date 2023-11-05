

const express = require("express");
const router = express.Router();
const { Restaurant } = require("../models");






//  new restaurant
router.post("/", async (req, res) => {
  try {
    const { name, address, contact } = req.body;
    const newRestaurant = await Restaurant.create({ name, address, contact });
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});








// Get restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});







// Update  restaurant
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address, contact } = req.body;

  try {
    const updatedRestaurant = await Restaurant.update(
      { name, address, contact },
      { where: { id } }
    );
    if (updatedRestaurant[0] === 1) {
      res.status(200).json({ message: "Restaurant updated successfully" });
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});









// Get restaurant by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findByPk(id);
    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});








// Delete a restaurant
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Restaurant.destroy({ where: { id } });
    if (deletedRows === 1) {
      res.status(200).json({ message: "Restaurant deleted successfully" });
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
