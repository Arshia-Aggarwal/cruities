const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    max: 400,
    min: 6,
    required: true,
  },
  email: {
    type: String,
    max: 400,
    min: 6,
    required: true,
  },
  password: {
    type: String,
    max: 400,
    min: 6,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
