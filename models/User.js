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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/api", routes);

// 👇 Add this route for root URL
app.get("/", (req, res) => {
  res.send("Welcome to HomeChef Backend!");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app;