const { admin, db } = require("../firebase/firebaseAdmin_config");

const addComment = async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const { comment } = req.body;
    const userId = req.user.uid;
    const userName = req.user.name || "Anonymous";

    if (!userId) {
      return res.redirect("/user/login");
    }

    if (!comment || comment.trim() === "") {
      console.log("Empty comment cannot be added");
      return res.redirect(`/user/blog/${blogId}`);
    }

    const commentData = {
      comment,
      blogId,
      userName,
      userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("comments").add(commentData);
    return res.redirect(`/user/blog/${blogId}`);
  } catch (error) {
    console.log("Error adding comment:", error.message);
    return res.redirect(`/user/blog/${blogId}`);
  }
};

module.exports = {
  addComment,
};
