const mongoose = require("mongoose");

const addCoupons = new mongoose.Schema(
  {
    discountRate: {
      type: Number,
      required: true,
    },
    couponCode: {
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
      required: true,
    },
    offeringPrice: {
      type: Number,
      required: true,
    },
    couponsUsed: {
      type: Number,
      default: 1,
    },
    companyName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupons", addCoupons);
