const express = require("express");
const recipesRoutes = require("./recipes");
const router = express.Router();
const recipeRouter = require("./recipes");

router.use("/", recipeRouter);
router.use("/:id", recipeRouter);
router.use("/img/:id", recipeRouter);
router.use("/edit", recipeRouter);
router.use("/postDetails", recipeRouter);
module.exports = router;
