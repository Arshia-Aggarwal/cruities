const router = require("express").Router();
const Coupons = require("../model/coupons.js");
const BusinessOwner = require("../model/registration.js");
const verifyToken = require("./verifyToken");

router.post("/business/coupons", async (req, res) => {
  // use verifytoken for userid nd filter
  const owner = await BusinessOwner.findOne({ email: req.body.email });
  const { userId } = owner._id;
  try {
    const addedCoupons = await Coupons.find({ userId: userId });
    res.status(200).json(addedCoupons);
    console.log(addedCoupons);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/business/create/coupon", async (req, res) => {
  // take pincode from verifytoken , couponcode allot
  // console.log(req.body.email);
  const user = await BusinessOwner.findOne({ email: req.body.email });
  // console.log(user.pinCode);
  let { discountRate, description, validTill, noOfCoupons, offeringPrice } =
    req.body;
  let couponCode = "aditya73";
  let pincode = user.pinCode;
  let companyName = user.name;
  discountRate = parseInt(discountRate);
  noOfCoupons = parseInt(noOfCoupons);
  offeringPrice = parseInt(offeringPrice);
  validTill = parseInt(validTill);

  const newcoupon = new Coupons({
    discountRate,
    description,
    pincode,
    validTill,
    companyName,
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

router.post("/user/coupons", async (req, res) => {
  let pincode = req.body.pincode;
  console.log(pincode);
  try {
    const addedCoupons = await Coupons.find({ pincode: pincode });
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
