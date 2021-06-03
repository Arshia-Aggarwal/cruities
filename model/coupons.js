const mongoose = require("mongoose");

const addCoupons = new mongoose.Schema(
  {
    discountRate: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OwnerDetails",
    },
    description: {
      type: String,
      max: 800,
      min: 4,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    validTill: {
      type: Number,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    noOfCoupons: {
      type: Number,
      max: 1000,
      min: 1,
      required: true,
    },
    offeringPrice: {
      type: Number,
      max: 100000,
      min: 1,
      required: true,
    },
    couponsUsed: {
      type: Number,
      max: 1000,
      min: 1,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupons", addCoupons);
