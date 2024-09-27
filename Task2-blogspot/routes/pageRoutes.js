const express = require("express");
const router = express.Router();

// import controllers
const {
  renderHomePage,
  renderBlogsPage,
  renderDashboardPage,
  renderAddBlogPage,
  renderEditBlogPage,
} = require("../controllers/pageController");

// import middleware
const optionalAuth = require("../middleware/optionalAuth");
const protected = require("../middleware/protected");

router.get("/", optionalAuth, renderHomePage);
router.get("/blogs", optionalAuth, renderBlogsPage);
router.get("/dashboard", protected, renderDashboardPage);
router.get("/addblog", protected, renderAddBlogPage);
router.get("/editblog/:id", protected, renderEditBlogPage);

module.exports = router;
