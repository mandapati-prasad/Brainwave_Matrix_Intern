const express = require("express");
const router = express.Router();

// import controllers

// import middleware
const protected = require("../middleware/protected");
const { addComment } = require("../controllers/commentController");

router.post("/comment/:blogId", protected, addComment);

module.exports = router;
