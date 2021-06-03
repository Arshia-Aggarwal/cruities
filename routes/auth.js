const router = require("express").Router();
const Owner = require("../model/registration");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  // if newowner exists
  const emailExist = await Owner.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exists");

  // bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  // create new newowner
  const newowner = new Owner({
    name: req.body.name,
    email: req.body.email,
    password: hashPass,
    pinCode: req.body.pinCode,
    address: req.body.address,
    contact: req.body.contact,
  });

  try {
    const savedOwner = await newowner.save();
    res.json({ newowner: newowner._id });
  } catch (err) {
    res.status(500).send(err);
  }
});

// login
router.post("/login", async (req, res) => {
  // if newowner exists
  const newowner = await Owner.findOne({ email: req.body.email });
  if (!newowner)
    return res.status(400).send("password or email doesn't exists");

  // password correct
  const validPass = await bcrypt.compare(req.body.password, newowner.password);
  if (!validPass) return res.status(400).send("invalid password");

  // create jwt token and assign
  const token = jwt.sign({ _id: newowner._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);

  // res.send("logged in");
});

module.exports = router;
