const express = require("express");
const router = express.Router();

const Controller = require("../controller.js");
router.post("/run-lfu", Controller.lfu);
//router.post("/run-mru", Controller.mlu);
//router.post("/run-lru", Controller.lru);
//router.post("/run-fifo", Controller.fifo);
//router.post("/run-optimal", Controller.optimal);
//console.log("Router Loaded");
module.exports = router;
