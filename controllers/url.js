import { nanoid } from "nanoid";
import URL from "../models/url.js";

export const handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", { id: shortId });
};

export const handleShortURL = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
  );
  console.log("Entry", entry);
  if (!entry) {
    return res.status(404).json({
      error: "Short URL not found",
    });
  }
  return res.redirect(entry.redirectUrl);
};

export const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId });
  if (!entry) {
    return res.status(404).json({
      error: "Short URL not found",
    });
  }
  return res.json({
    totalClicks: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
};
