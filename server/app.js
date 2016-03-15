var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var index = require("./routes/index");

app.set("port", (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", index)

app.listen(3000, function() {
  console.log("Listening on port: 3000");
});
