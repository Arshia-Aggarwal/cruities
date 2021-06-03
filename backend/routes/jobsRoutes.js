const router = require("express").Router();
const verifyToken = require("./verifyToken");
const BusinessOwner = require("../model/registration.js");
const Jobs = require("../model/jobs.js");
const User = require("../model/User");
const nodemailer = require("nodemailer");

router.post("/business/create/job", verifyToken, async (req, res) => {
	//   let pincode = parseInt(req.newowner.pincode);
	// contact details uthao and pincode uthao

	let { title, description, duration, payRange, pincode } = req.body;

	payRange = parseInt(payRange);

	const newjob = new Jobs({
		title,
		description,
		duration,
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

// router.post("/business/email", async (req, res) => {
//   try {

//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.get("/send", (req, res) => {
	// const output = `
	//   <p>You have a new contact request</p>
	//   <h3>Contact Details</h3>
	//   <ul>
	//     <li>Name: ${req.body.name}</li>
	//     <li>Company: ${req.body.company}</li>
	//     <li>Email: ${req.body.email}</li>
	//     <li>Phone: ${req.body.phone}</li>
	//   </ul>
	//   <h3>Message</h3>
	//   <p>${req.body.message}</p>
	// `;

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 25,
		secure: false,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	});

	// setup email data with unicode symbols
	let mailOptions = {
		from: "thebackholders@gmail.com",
		to: "rahulgoyal233.rg@gmail.com",
		subject: "Testing and Testing",
		text: "Randibaaz!",
	};

	// send mail with defined transport object
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
	const { userId } = req.newowner.userId;
	try {
		const addedJobs = await Jobs.find({ userId: userId });
		res.status(200).json(addedJobs);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/user/jobs", async (req, res) => {
	const pinCode = 141401;

	try {
		const addedJobs = await Jobs.find({ pincode: pinCode });
		res.status(200).json(addedJobs);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
