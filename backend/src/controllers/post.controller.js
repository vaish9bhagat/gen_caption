const captiongenerator = require("../services/ai.service");
const uploadfile = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");
const postmodel = require("../models/post.model");
const usermodel = require("../models/user.model")

const createpostcontroller = async (req, res) => {
    const file = req.file;
    console.log(file)

    if (!file) {
        return res.status(200).json({
            message: "image not selected"
        })
    }

    const base64ImageFile = new Buffer.from(file.buffer).toString("base64");
    const [caption, imagefile] = await Promise.all([
        captiongenerator(base64ImageFile),
        uploadfile(file, uuidv4())
    ])

    const post = await postmodel.create({
        caption: caption,
        image: imagefile,
        user: req.user._id,
        location: req.body.location
    })
    return res.status(201).json({
        message: 'post created successfully',
        post
    })



}
const showpostcontroller = async (req, res) => {
    const posts = await postmodel
        .find()
        .populate("user")
        .sort({ createdAt: -1 });

    const user = req.user;
    console.log(user)


    res.json({
        posts,
        user



    })
}
const deletepostcontroller = async (req, res) => {
    const { id } = req.params;
    await postmodel.deleteOne({ _id: id });
    const allPosts = await postmodel.find();
    res.json({
        message: "post deleted successfully",
        allPosts
    })


}
const likePostController = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await postmodel.findById(postId);
        const userId = req.user._id.toString();

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        } else {
            post.likes.push(userId)
        }

        post.save()

        res.status(201).json({
            message: "liked a post ",
            post
        })

    } catch (error) {
        console.log(error)

    }
}
const userPostController = async (req, res) => {
    const userId = req.user._id.toString()
    console.log(userId)
    const userPosts = await postmodel.find({ user: userId });
    res.status(201).json({
        message: "user post fetched successfully",
        userPosts
    })
}
const userProfileImageController = async (req, res) => {
    const file = req.file;
    const userId = req.user._id.toString();

    if (!file) {
        return res.status(400).json({
            message: "no image is selected"
        })

    }
    const profileImage = await uploadfile(file, uuidv4())

    const user = await usermodel.findById(userId)

    user.profileimage = profileImage;
    user.save()


    res.json({
        user
    })
}
module.exports = {
    createpostcontroller,
    showpostcontroller,
    deletepostcontroller,
    likePostController,
    userPostController,
    userProfileImageController
}