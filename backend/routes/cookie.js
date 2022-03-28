var express = require("express");
const cookieController = require("../controllers/cookieController");
var router = express.Router();
router.get("/", function (req, res) {
  res.send("Cookie");
});
router.get("/viewcookies", cookieController.viewCookies);
router.get("/delete/:name", cookieController.deleteCookie);
//Assignemnt
router.get("/setcookiewithcity/:city/:value", cookieController.setCity);
router.get(
  "/setNameValueTime/:name/:value/:time",
  cookieController.setNameValueTime
);
module.exports = router;
