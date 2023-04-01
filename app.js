const express = require("express"),
  bodyParser = require("body-parser"),
  https = require("https"),
  app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 2000, () =>
  console.log("Listening on port 2000")
);
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const firstName = req.body.FName,
    lastName = req.body.LName,
    email = req.body.email;
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
    auth: "abhi:bee786fe78dc3074dc0b37b46c86d563-us13",
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
