const router = require("express").Router();
const mongoose = require("mongoose");
const Coupons = require("../model/coupons.js");
const BusinessOwner = require("../model/registration.js");
const verifyToken = require("./verifyToken");

router.get("/business/coupons", verifyToken, async (req, res) => {
  const { userId } = req.newowner.userId;
  try {
    const addedCoupons = await Coupons.find({ userId: userId });
    res.status(200).json(addedCoupons);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/business/create/coupon", verifyToken, async (req, res) => {
  //   let pincode = parseInt(req.newowner.pincode);
  // attach pincode to auto token

  let {
    discountRate,
    description,
    validTill,
    noOfCoupons,
    offeringPrice,
    pincode,
    couponsUsed,
  } = req.body;

  discountRate = parseInt(discountRate);
  noOfCoupons = parseInt(noOfCoupons);
  offeringPrice = parseInt(offeringPrice);
  couponsUsed = parseInt(couponsUsed);
  validTill = parseInt(validTill);

  const newcoupon = new Coupons({
    discountRate,
    description,
    pincode,
    validTill,
    couponsUsed,
    noOfCoupons,
    offeringPrice,
  });

  try {
    const savedCoupon = await newcoupon.save();
    res.json({ savedCoupon });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/user/coupons", async (req, res) => {
  const pinCode = 141401;

  try {
    const addedCoupons = await Coupons.find({ pincode: pinCode });
    res.status(200).json(addedCoupons);
  } catch (err) {
    res.status(500).send(err);
  }
});

// router.delete("/business/delete/coupons", async (req, res) => {
//    const userId = req.body;

//  if (err) throw err;
//   var dbo = db.db("test");
//   /*Delete the first customers with the address "Mountain 21":*/
//   var myquery = { userId: userId };
//   dbo.collection("coupons").deleteOne(myquery, function(err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     db.close();

// });

// router.delete("/Id", function (req, res) {
//   const code = "60b79988d110315620334741";
//   const uri = "http://localhost:3000/api/Id";
//   mongoose.connect(uri, { useFindAndModify: false });

//   mongoose.set("useFindAndModify", true);
//   Coupons.findByIdAndRemove({ userId: code }, function (err) {
//     if (err) {
//       console.log("PROBLEM!");
//     } else {
//       res.redirect("/api/business/coupons");
//     }
//   });
// });

module.exports = router;
