// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/Book");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// GET ALL BOOKS (with search + filter + sorting)
app.get("/api/books", async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    let filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { title: regex },
        { author: regex },
        { isbn: regex }
      ];
    }

    let sortOption = {};
    if (sort) {
      const [field, direction] = sort.split("_");
      sortOption[field] = direction === "desc" ? -1 : 1;
    } else {
      sortOption = { createdAt: -1 };
    }

    const books = await Book.find(filter).sort(sortOption);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD NEW BOOK
app.post("/api/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE BOOK
app.put("/api/books/:id", async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE BOOK
app.delete("/api/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET CATEGORIES (unique)
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Book.distinct("category");
    res.json(["All", ...categories]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
