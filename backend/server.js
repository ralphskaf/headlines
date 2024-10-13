const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 8080;
const newsApiKey = process.env.NEWS_API_KEY;
const CACHE_DURATION = 1000 * 60 * 1; // 1 minute

app.use(cors()); // Enable CORS for all routes

// Cache variables
let cachedNews = null;
let cacheTime = null;
let fetchingNews = false;
let fetchQueue = [];

// Function to fetch news from the News API
const fetchNews = async () => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`
    );
    cachedNews = response.data.articles; // Cache the articles
    cacheTime = Date.now(); // Update cache time
    return cachedNews;
  } catch (error) {
    throw new Error("Failed to fetch news headlines");
  } finally {
    fetchingNews = false; // Reset fetching flag
    fetchQueue.forEach((resolve) => resolve(cachedNews)); // Resolve all queued promises
    fetchQueue = []; // Clear the queue
  }
};

// Route to get news headlines
app.get("/api/news", async (req, res) => {
  // Serve cached news if cache is still valid
  if (cachedNews && cacheTime > Date.now() - CACHE_DURATION) {
    return res.json(cachedNews);
  }

  // If a fetch is already in progress, queue the request
  if (fetchingNews) {
    return new Promise((resolve) => {
      fetchQueue.push(resolve);
    }).then((news) => res.json(news));
  }

  // Set fetching flag and fetch news
  fetchingNews = true;
  try {
    const news = await fetchNews();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
