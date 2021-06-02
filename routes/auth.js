const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  // if user exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exists");

  // bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  // create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPass,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(500).send(err);
  }
});

// login
router.post("/login", async (req, res) => {
  // if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("password or email doesn't exists");

  // password correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("invalid password");

  // create jwt token and assign
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);

  // res.send("logged in");
});

module.exports = router;
