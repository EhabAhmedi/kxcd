const mongoose = require("mongoose");

const comicSchema = new mongoose.Schema({
  month: String,
  num: Number,
  link: String,
  year: String,
  news: String,
  safe_title: String,
  transcript: String,
  alt: String,
  img: String,
  title: String,
  day: String,
  views: {
    type: Number,
    default: 0,
  },
});

const Comic = mongoose.model("Comic", comicSchema);

module.exports = Comic;
