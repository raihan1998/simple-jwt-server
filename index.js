const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('inside verify token', authHeader);
};

app.get("/", (req, res) => {
  res.send("Hello simple form jwt.....");
});

app.post("/login", (req, res) => {
  const user = req.body;
  console.log(user);
  // Dangerous: Do not check password here for serious application
  // Use proper process for hashing and checking
  // After completing all authentication related verification, issue JWT token
  // not real time used : user.email === 'user@gmail.com'
  if (user.email === "user@gmail.com" && user.password === "12345") {
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" }
    );
    res.send({
      success: true,
      accessToken: accessToken,
    });
  } else {
    res.send({ success: false });
  }
});

app.get("/orders", verifyJWT, (req, res) => {
  res.send([
    { id: 1, item: "apple" },
    { id: 2, item: "oranges" },
  ]);
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
