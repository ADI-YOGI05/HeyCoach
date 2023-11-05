
const express = require("express");
const router = express.Router();
const restaurantRoutes = require("./restaurants");







              router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Restaurant Listing Platform API!" });
});










router.use("/restaurants", restaurantRoutes);











module.exports = router;
