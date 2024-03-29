const mongoose = require("mongoose");

const Jobs = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OwnerDetails",
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    payRange: {
      type: Number,
      required: true,
    },
    contactnumber: {
      type: Number,
      required: true,
    },
    contactid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", Jobs);
