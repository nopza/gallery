const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.static(__dirname + "/uploaded"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", require("./api/api"));

app.listen(8081, () => {
  console.log("Server is running...");
});
