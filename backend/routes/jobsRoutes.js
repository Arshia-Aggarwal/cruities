const router = require("express").Router();
const verifyToken = require("./verifyToken");
const BusinessOwner = require("../model/registration.js");
const Jobs = require("../model/jobs.js");
const User = require("../model/User");
const nodemailer = require("nodemailer");
const jobs = require("../model/jobs.js");

router.post("/business/create/job", verifyToken, async (req, res) => {
  //   let pincode = parseInt(req.newowner.pincode);
  // contact details uthao from database and pincode uthao or link to db

  let { title, description, duration, payRange, pincode } = req.body;

  payRange = parseInt(payRange);

  const newjob = new Jobs({
    title,
    description,
    duration,
    userId,
    contactnumber,
    contactid,
    pincode,
    payRange,
  });

  try {
    const savedJob = await newjob.save();
    res.json({ savedJob });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/send", (req, res) => {
  // activate when owner adds jobs
  // match pincode and sesned to all contact

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 25,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: "thebackholders@gmail.com",
    to: "rahulgoyal233.rg@gmail.com",
    subject: "Testing and Testing",
    text: "Randibaaz!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // res.render("contact", { msg: "Email has been sent" });
  });
});

router.get("/business/jobs", verifyToken, async (req, res) => {
  // match userId from database and display

  const { userId } = req.newowner.userId;
  try {
    const addedJobs = await Jobs.find({ userId: userId });
    res.status(200).json(addedJobs);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/user/jobs", async (req, res) => {
  const pinCode = req.body.pincode;

  try {
    const addedJobs = await Jobs.find({ pincode: pinCode });
    res.status(200).json(addedJobs);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
