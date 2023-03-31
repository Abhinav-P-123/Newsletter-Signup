const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 2000, function () {
  console.log("Listening on port 2000");
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const firstName = req.body.FName;
  const lastName = req.body.LName;
  const email = req.body.email;
  const url = "https://us13.api.mailchimp.com/3.0/lists/b4946f8808";
  res.send(firstName);
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
    auth: "abhi:56920d3e220a65763432afa2eeb1f69b-us13",
  };

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});
// API Key
// 56920d3e220a65763432afa2eeb1f69b-us13

// List Id
// b4946f8808
