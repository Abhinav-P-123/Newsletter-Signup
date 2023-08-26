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
=======
app.listen(process.env.PORT || port, () => {});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const firstName = req.body.FName,
    lastName = req.body.LName,
    email = req.body.email,
    url = "https://us13.api.mailchimp.com/3.0/lists/b4946f8808";
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  var options = {
    method: "POST",
    auth: "abhi:0cc47a90cbbffd5bbf3812e997f861a1-us13",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else if (response.statusCode != 200) {
      res.sendFile(__dirname + "/failure.html");
>>>>>>> fbda377af08d5ba98b047f250fe2018cc730790e
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
