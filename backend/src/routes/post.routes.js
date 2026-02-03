const express = require("express");
const multer = require("multer");
const authmiddleware = require("../middlewares/auth.middelware");
const { createpostcontroller, showpostcontroller, deletepostcontroller, likePostController, userPostController, userProfileImageController } = require("../controllers/post.controller");

const uploads = multer({ storage: multer.memoryStorage() })

const router = express.Router();

router.post("/createpost", uploads.single("file"), authmiddleware, createpostcontroller);

router.get("/allposts", authmiddleware, showpostcontroller);

router.delete("/deletepost/:id", authmiddleware, deletepostcontroller)

router.post("/likepost/:postId", authmiddleware, likePostController)

router.post("/userposts/", authmiddleware, userPostController)

router.post("/userprofileimage",uploads.single("image"), authmiddleware, userProfileImageController)


module.exports = router;