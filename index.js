require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./connection");
const routes = require("./routes");

connectDB();
app.use(express.json());
app.use(cors({ origin: "https://lovely-empanada-5f6eb2.netlify.app", credentials: true }));
app.use(cookieParser());
app.use("/api", routes);

// 👇 Add this route for root URL
app.get("/", (req, res) => {
  res.send("Welcome to HomeChef Backend!");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app;