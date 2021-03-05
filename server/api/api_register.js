const express = require("express");

const bcrypt = require("bcryptjs");

const router = express.Router();
const Users = require("../models/user_schema");

router.post("/register", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const dataRecieve = {
      username: req.body.username,
      password: req.body.password,
    };
    const acc = await Users.create(dataRecieve);
    if (acc) {
      res.json({ result: "success" });
    } else {
      res.json({ result: "failed" });
    }
  } catch (e) {
    res.json({ result: "failed", message: "internal error" });
  }
});

module.exports = router;
