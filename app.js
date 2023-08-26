const express = require("express"),
  bodyParser = require("body-parser"),
  https = require("https");
var mongoose = require("mongoose"),
  app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const port = 2000;
app.listen(process.env.PORT || port, () => { });
require("dotenv").config()
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

mongoose.connect(process.env.mongoDBConnectionString)

const emailSchema = new mongoose.Schema({
  FName: {
    type: String,
    required: true,
  },
  LName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});
app.set("view engine", "ejs")
const emailDB = mongoose.model("Email", emailSchema);

app.post("/", (req, res) => {
  const reqData = req.body;

  var emailData = [
    {
      FName: reqData.FName,
      LName: reqData.LName,
      email: reqData.email,
    }
  ];

  emailDB.find({ email: reqData.email }).then(data => {
    if (data.length > 0) {
      res.sendFile(__dirname + "/failure.html")
    } else if (data.length == 0) {
      emailDB.insertMany(emailData).then(data => {
        if (data.length > 0) {
          res.sendFile(__dirname + "/success.html")
        } else {
          res.sendFile(__dirname + "/failure.html")
        }
      })
    }
  })
})


app.get("/try", (req, res) => {
  res.sendFile(__dirname + "/signup.html")
})