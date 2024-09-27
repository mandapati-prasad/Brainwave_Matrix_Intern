const express = require("express");
const upload = require("../middleware/multer_config");
const router = express.Router();

// import controllers
const {
  addBlog,
  deleteBlog,
  getSingleBlog,
  updateBlog,
} = require("../controllers/blogController");

// import middleware
const protected = require("../middleware/protected");
const optionalAuth = require("../middleware/optionalAuth");

router.post("/addblog", protected, upload.single("bannerImg"), addBlog);
router.get("/delete/:id", protected, deleteBlog);
router.get("/blog/:id", optionalAuth, getSingleBlog);
router.post("/editblog/:id", protected, upload.single("bannerImg"), updateBlog);

module.exports = router;
