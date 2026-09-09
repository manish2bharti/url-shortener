import express from "express";
import {
  handleGenerateNewShortURL,
  handleShortURL,
  handleGetAnalytics,
} from "../controllers/url.js";

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.route("/:shortId").get(handleShortURL);

router.route("/analytics/:shortId").get(handleGetAnalytics);

export default router;
