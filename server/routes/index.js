var express = require("express");
var router = express.Router();
var path = require("path");
var data = require("../public/data/data.json");
var employee = require("../public/modules/employee.js");

router.get("/data", function(req,res){
    res.send(data);
});

router.use("/employee", function(req, res){
  res.send(employee(data));
});

router.get("/*", function(req,res){
    var file = req.params[0] || "/view/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;
