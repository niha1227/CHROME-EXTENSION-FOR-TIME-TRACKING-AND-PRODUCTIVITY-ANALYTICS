const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
    site: String,
    time: Number
});

module.exports = mongoose.model("UserData", UserDataSchema);
