const express = require("express");
const router = express.Router();
const comicController = require("../controllers/comicController");

// Get the latest comic
router.get("/latest", comicController.getLatestComic);

// Get a specific comic by ID
router.get("/:id", comicController.getComicById);

module.exports = router;
