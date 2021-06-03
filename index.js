const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const couponRoute = require("./routes/couponsRoutes");
const jobRoute = require("./routes/jobsRoutes");
const userRoute = require("./routes/userRoutes");
dotenv.config();

// connect to database
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);

// middleware
// for reading the name etc given by request body
app.use(express.json());
app.use(cors());

// routes middlewae
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api", couponRoute);
app.use("/api", jobRoute);
app.use("/api", userRoute);

app.listen(3000, () => console.log("Server Up and running"));
