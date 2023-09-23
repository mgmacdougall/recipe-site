const express = require("express");
const recipesRoutes = express.Router();
const data = require("../data/source.data");
const { getRecipes } = require("../controllers/recipeController");
const path = require("path");
recipesRoutes.get("/", (req, res) => {
  const stuff = getRecipes();
  res.send(stuff);
});

recipesRoutes.get("/:id", (req, res) => {
  const { udata } = data;
  const { id } = req.params;
  let result = udata.find((item) => item.id == id);
  res.end(JSON.stringify(result));
});

recipesRoutes.get("/img/:id", (req, res) => {
  const { id } = req.params;
  const { udata } = data;

  const result = udata.find((item) => item.id == id);
  const t = path.join(__dirname, "..", "public", "imgs", result.img).toString();
  res.sendFile(t);
});

recipesRoutes.post("/postDetails", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const { udata } = data;
  body.id = Math.floor(Math.random() * 1000);
  body.name=body.name
  body.details =
    "Officia eu non adipisicing eu mollit qui ipsum culpa non consequat.";
  body.steps = [];
  body.img = ""||"place_holder.jpg";
  udata.push(body);

  console.log(udata)
  res.redirect("/");
});

recipesRoutes.get("/edit", (req, res) => {});
module.exports = recipesRoutes;
