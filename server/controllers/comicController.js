const axios = require("axios");
const Comic = require("../models/comicSchema");

// Fetch the latest comic
const getLatestComic = async (req, res) => {
  try {
    const response = await axios.get("https://xkcd.com/info.0.json");

    const comicData = response.data;

    let comic = await Comic.findOne({ num: comicData.num });

    if (!comic) {
      comic = new Comic(comicData);
    }

    res.status(200).json(comic);

  } catch (error) {
    console.error("Error fetching latest comic:", error);
    res.status(500).json({ message: "Failed to fetch latest comic" });
  }
};


// Fetch a specific comic by ID
const getComicById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://xkcd.com/${id}/info.0.json`);
    const comicData = response.data;

    let comic = await Comic.findOne({ num: comicData.num });

    if (!comic) {
      comic = new Comic(comicData);
    }

    comic.views += 1;

    await comic.save();
    
    res.status(200).json(comic);
  } catch (error) {
    console.error(`Error fetching comic with ID ${id}:`, error);
    res.status(500).json({ message: `Failed to fetch comic with ID ${id}` });
  }
};

module.exports = {
  getLatestComic,
  getComicById,
};
