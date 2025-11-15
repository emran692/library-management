const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, default: "" },
  isbn: { type: String, default: "" },
  category: { type: String, default: "General" },
  year: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Book", BookSchema);
