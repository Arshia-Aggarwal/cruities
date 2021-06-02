const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

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

app.listen(3000, () => console.log("Server Up and running"));
