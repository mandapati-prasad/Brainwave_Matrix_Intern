const { db } = require("../firebase/firebaseAdmin_config");

const renderHomePage = async (req, res) => {
  const userProfile = req.user
    ? { name: req.user.name || req.user.email, id: req.user.uid }
    : null;

  try {
    const blogref = db.collection("blogs");
    const snapshot = await blogref.orderBy("createdAt", "desc").limit(6).get();

    if (snapshot.empty) {
      return res.render("index", { user: userProfile, blogs: [] });
    }

    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.render("index", { user: userProfile, blogs });
  } catch (error) {
    console.log(error.message);
    res.render("index", { user: userProfile, blogs: [] });
  }
};

const renderBlogsPage = async (req, res) => {
  const userProfile = req.user
    ? { name: req.user.name || req.user.email, id: req.user.uid }
    : null;

  const search = req.query.search || "";
  const category = req.query.category || "All";
  const page = parseInt(req.query.page) || 1;
  const limit = 6;

  try {
    const blogref = db.collection("blogs");
    let query = blogref.orderBy("createdAt", "desc");

    if (category !== "All") {
      query = query.where("category", "==", category);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      return res.render("blogs", {
        user: userProfile,
        blogs: [],
        search,
        category,
        currentPage: page,
        totalPages: 1,
      });
    }

    const filteredBlogs = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(
        (blog) =>
          blog.title.toLowerCase().includes(search.toLowerCase()) ||
          blog.content.toLowerCase().includes(search.toLowerCase())
      );

    const totalBlogs = filteredBlogs.length;
    const totalPages = Math.ceil(totalBlogs / limit);
    const paginatedBlogs = filteredBlogs.slice(
      (page - 1) * limit,
      page * limit
    );

    res.render("blogs", {
      user: userProfile,
      blogs: paginatedBlogs,
      search,
      category,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.log(error.message);
    res.render("blogs", {
      user: userProfile,
      blogs: [],
      search,
      category,
      currentPage: page,
      totalPages: 1,
    });
  }
};

const renderDashboardPage = async (req, res) => {
  const userProfile = req.user
    ? { name: req.user.name || req.user.email, id: req.user.uid }
    : null;

  try {
    const blogref = db.collection("blogs");
    const snapshot = await blogref
      .where("userId", "==", userProfile.id)
      .orderBy("createdAt", "desc")
      .get();

    if (snapshot.empty) {
      return res.render("dashboard/dashboard", {
        user: userProfile,
        blogs: [],
      }); // Add return to stop further execution
    }

    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.render("dashboard/dashboard", { user: userProfile, blogs });
  } catch (error) {
    console.log(error.message);
    res.render("dashboard/dashboard", { user: userProfile, blogs: [] });
  }
};

const renderAddBlogPage = async (req, res) => {
  const userProfile = req.user
    ? { name: req.user.name || req.user.email }
    : null;
  res.render("dashboard/addblog", { error: null, user: userProfile });
};

const renderEditBlogPage = async (req, res) => {
  const userProfile = req.user
    ? { name: req.user.name || req.user.email }
    : null;
  const blogId = req.params.id;

  try {
    const blogRef = await db.collection("blogs").doc(blogId).get();
    if (!blogRef.exists) {
      return res
        .status(404)
        .render("404", { user: userProfile, message: "Blog not found" });
    }

    const blogData = { id: blogId, ...blogRef.data() };
    console.log(blogData);

    return res.render("dashboard/editblog", {
      error: null,
      user: userProfile,
      blogData,
    });
  } catch (error) {
    console.log("Error fetching blog:", error.message);
    return res.status(500).render("500", {
      user: userProfile,
      message: "Failed to load blog post",
    });
  }
};

module.exports = {
  renderHomePage,
  renderBlogsPage,
  renderDashboardPage,
  renderAddBlogPage,
  renderEditBlogPage,
};
