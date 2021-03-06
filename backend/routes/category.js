var express = require("express");
var router = express.Router();
var categoryController = require("../controllers/category");
router.get("/createtable", categoryController.createtable);
router.post("/", categoryController.insertCategory);
router.get("/", categoryController.selectAll);
router.get("/:id", categoryController.viewCategory);
router.delete("/:id", categoryController.deleteCategory);
router.delete("/", categoryController.deleteAll);
router.put("/:id", categoryController.updateCategory);
module.exports = router;
