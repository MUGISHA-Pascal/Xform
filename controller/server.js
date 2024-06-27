const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const Data = require("../model/model");
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to the backend");
    app.listen(2024, () => {
      console.log("Server started");
    });
  })
  .catch((e) => console.error("Error connecting to the db", e));

app.post("/add", async (req, res) => {
  try {
    const data = new Data(req.body);
    await data.save();
    res.status(201).json({ message: "Data added successfully", data });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(400).json({ message: "Error adding data", error });
  }
});
app.get("/saved", async (req, res) => {
  const getData = await Data.find();
  return res.status(200).json(getData);
});

app.delete("/delete", async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
    const removeData = await Data.findByIdAndDelete(id);
    return res.status(200).json({ message: "Data removed" });
  } catch (e) {
    return res
      .status(401)
      .json({ message: e.message || "Error occured deleting data" });
  }
});
app.put("/update/:id", async (req, res) => {
  const itemId = req.params.id;
  const updateData = req.body;

  try {
    const updatedItem = await Data.findByIdAndUpdate(itemId, updateData, {
      new: true,
    });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
