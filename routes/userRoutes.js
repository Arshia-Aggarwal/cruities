const router = require("express").Router();
const User = require("../model/user.js");
const verifyToken = require("./verifyToken");

router.post("/user/email", async (req, res) => {
  const newuser = new User({
    email: req.body.email,
    pincode: req.body.pincode,
  });
  try {
    const savedUser = await newuser.save();
    res.json({ savedUser });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
