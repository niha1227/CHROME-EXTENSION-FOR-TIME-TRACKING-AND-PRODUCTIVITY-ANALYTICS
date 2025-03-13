const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const UserData = require("./models/UserData");

app.post("/save", async (req, res) => {
    const { site, time } = req.body;
    await UserData.updateOne({ site }, { $inc: { time } }, { upsert: true });
    res.send("Data Saved");
});

app.get("/analytics", async (req, res) => {
    const data = await UserData.find();
    res.json(data);
});

app.listen(5001, () => console.log("Server running on port 5001"));
