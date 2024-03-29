const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    max: 400,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
