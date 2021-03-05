const express = require("express");

const router = express.Router();
const Users = require("../models/user_schema");
const bcrypt = require("bcryptjs");
const jwt = require("../jwt");
const randtoken = require("rand-token");
const refreshTokens = {};

router.get("/login", (req, res) => {
  res.end("login");
});

router.post("/login", async (req, res) => {
  try {
    const doc2 = await Users.findOne({ username: req.body.username });
    //Is user exist
    if (doc2) {
      //check password
      var isValidPassword = await bcrypt.compare(
        req.body.password,
        doc2.password
      );

      if (isValidPassword) {
        const payload = {
          id: doc2._id,
          username: doc2.username,
        };
        const token = jwt.sign(payload, 1000000000000);
        const refreshToken = randtoken.uid(256);
        refreshTokens[refreshToken] = payload.username;

        res.json({
          result: "success",
          token,
          refreshToken,
          message: "success",
        });
        //return ok
      } else {
        res.json({ result: "failed", message: "password is wrong" });
        //return nok - password wrong
      }
    } else {
      res.json({ result: "failed", message: "username not found" });
      //return nok - username not found
    }
  } catch (e) {
    res.json(e);
  }
});

// Refresh Token
let count = 1;
router.post("/refresh/token", function (req, res) {
  const refreshToken = req.body.refreshToken;
  console.log("Refresh Token : " + count++);

  if (refreshToken in refreshTokens) {
    const payload = {
      username: refreshTokens[refreshToken],
    };
    const token = jwt.sign(payload, "50000000000"); // unit is millisec
    res.json({ jwt: token });
  } else {
    console.log("Not found");
    return res
      .status(403)
      .json({ auth: false, message: "Invalid refresh token" });
  }
});

module.exports = router;
