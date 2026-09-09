import express from "express";
import URL from "../models/url.js";

const staticRoute = express.Router();

staticRoute.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allURLs = await URL.find({ createBy: req.user._id });
  return res.render("home", { urls: allURLs });
});

staticRoute.get("/signup", async (req, res) => {
  return res.render("signup");
});

staticRoute.get("/login", async (req, res) => {
  return res.render("login");
});

export default staticRoute;
