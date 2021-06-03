const router = require("express").Router();
const mongoose = require("mongoose");
const Coupons = require("../model/coupons.js");
const BusinessOwner = require("../model/registration.js");
const verifyToken = require("./verifyToken");

router.get("/business/coupons", verifyToken, async (req, res) => {
  // use verifytoken for userid nd filter

  const { userId } = req.newowner.userId;
  try {
    const addedCoupons = await Coupons.find({ userId: userId });
    res.status(200).json(addedCoupons);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/business/create/coupon", async (req, res) => {
  //   let pincode = parseInt(req.newowner.pincode);
  // take pincode from verifytoken , couponcode allot
  // and couponsUsed function

  let { discountRate, description, validTill, noOfCoupons, offeringPrice } =
    req.body;

  pincode = 141401;
  let couponCode = "aditya73";

  discountRate = parseInt(discountRate);
  noOfCoupons = parseInt(noOfCoupons);
  offeringPrice = parseInt(offeringPrice);
  validTill = parseInt(validTill);

  const newcoupon = new Coupons({
    discountRate,
    description,
    pincode,
    validTill,
    noOfCoupons,
    couponCode,
    offeringPrice,
  });

  try {
    const savedCoupon = await newcoupon.save();
    res.json({ savedCoupon });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/user/coupons", async (req, res) => {
  let pinCode = req.body.pincode;

  try {
    const addedCoupons = await Coupons.find({ pincode: pinCode });
    res.status(200).json(addedCoupons);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/coupon/delete", verifyToken, async (req, res) => {
  // take couponCode from database and associate to the frontend button

  let filter = { couponCode: req.body.couponCode };
  let update = { isValid: false };

  try {
    let deletedCoupon = await Coupons.findOneAndUpdate(filter, update);
    console.log(deletedCoupon);
  } catch (err) {
    return console.log(err);
  }
});

module.exports = router;
