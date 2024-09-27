const { admin, db, bucket } = require("../firebase/firebaseAdmin_config");

const addBlog = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const userId = req.user.uid;

    if (!req.file) {
      return res.render("dashboard/addblog", { error: "No file Uploaded" });
    }

    const imageFile = req.file;
    const blob = bucket.file(`banner-images/${imageFile.originalname}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      console.log("Upload error: ", err);
      return res.render("dashboard/addblog", {
        error: "Failed to upload image",
      });
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.cloud.google.com/${bucket.name}/${blob.name}`;

      const blogData = {
        title,
        category,
        content,
        imageUrl: publicUrl,
        userId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      await db.collection("blogs").add(blogData);
      return res.redirect("/dashboard");
    });
    blobStream.end(req.file.buffer);
  } catch (error) {
    console.log("Error:", error.message);
    return res.render("dashboard/addblog", { error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const postId = req.params.id;
    await db.collection("blogs").doc(postId).delete();
    console.log("Deleted post ID:", postId);
    return res.redirect("/dashboard");
  } catch (error) {
    console.log("Delete Error:", error.message);
    return res.redirect("/dashboard");
  }
};

const getSingleBlog = async (req, res) => {
  const userProfile = req.user
    ? { name: req.user.name || req.user.email, id: req.user.uid }
    : null;

  try {
    const postId = req.params.id;
    const postRef = await db.collection("blogs").doc(postId).get();
    if (!postRef.exists) {
      return res
        .status(404)
        .render("404", { user: userProfile, message: "Blog not found" });
    }
    const postData = { id: postId, ...postRef.data() };

    const snapShot = await db
      .collection("comments")
      .where("blogId", "==", postId)
      .get();
    const commentsData = snapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.render("blog", { user: userProfile, postData, commentsData });
  } catch (error) {
    console.log("Error fetching blog:", error.message);
    return res.status(500).render("500", {
      user: userProfile,
      message: "Failed to load blog post",
    });
  }
};

const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const { title, category, content, existingImageUrl } = req.body;
  let bannerImgUrl = existingImageUrl;
  const userId = req.user.uid;

  try {
    const blogDoc = await db.collection("blogs").doc(blogId).get();
    if (!blogDoc.exists) {
      throw new Error("Blog not found");
    }

    if (req.file) {
      const oldImageFileName = existingImageUrl
        ? decodeURIComponent(existingImageUrl.split("/").pop().split("?")[0])
        : null;

      if (oldImageFileName) {
        const oldFileRef = bucket.file(`banner-images/${oldImageFileName}`);
        await oldFileRef.delete().catch((err) => {
          console.log("Failed to delete old image:", err);
        });
      }

      const imageFile = req.file;
      const blob = bucket.file(`banner-images/${imageFile.originalname}`);

      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: imageFile.mimetype,
        },
      });

      blobStream.on("error", (err) => {
        console.log("Upload error: ", err);
        return res.render("dashboard/editblog", {
          blogData: req.body,
          error: "Failed to upload new image",
        });
      });

      blobStream.on("finish", async () => {
        const publicUrl = `https://storage.cloud.google.com/${bucket.name}/${blob.name}`;

        const blogData = {
          title,
          category,
          content,
          imageUrl: publicUrl,
          userId,
          updatedAt: new Date(),
        };

        await db.collection("blogs").doc(blogId).update(blogData);
        return res.redirect("/dashboard");
      });
      blobStream.end(req.file.buffer);
    } else {
      await db.collection("blogs").doc(blogId).update({
        title,
        category,
        content,
        imageUrl: bannerImgUrl,
        userId,
        updatedAt: new Date(),
      });
      return res.redirect("/dashboard");
    }
  } catch (error) {
    console.log(error);
    res.render("dashboard/editblog", {
      blogData: req.body,
      error: "Failed to update blog post.",
      user: req.user,
    });
  }
};

module.exports = {
  addBlog,
  deleteBlog,
  getSingleBlog,
  updateBlog,
};
