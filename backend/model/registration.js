const mongoose = require("mongoose");

const RegisterationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 400,
      // min: 4,
      required: true,
    },
    email: {
      type: String,
      max: 400,
      // min: 6,
      required: true,
    },
    password: {
      type: String,
      // min: 6,
      required: true,
    },

    pinCode: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OwnerDetails", RegisterationSchema);
