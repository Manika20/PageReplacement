const express = require("express");
const router = express.Router();

const Controller = require("../controller.js");
router.post("/run-lfu", Controller.lfu);

//console.log("Router Loaded");
module.exports = router;
