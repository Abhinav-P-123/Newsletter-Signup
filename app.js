const express = require("express"),
  bodyParser = require("body-parser"),
  https = require("https"),
  app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const port = 2000;
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
    }
  });
  request.write(jsonData);
  request.end();
});
app.post("/failure", function (req, res) {
  res.redirect("/");
});
