const captiongenerator = require("../services/ai.service");
const uploadfile = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");
const postmodel = require("../models/post.model");

const createpostcontroller = async (req, res) => {
    const file = req.file;
    console.log(file)

    if (!file) {
        return res.json({
            message: "no file found"
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
        user: req.user._id
    })
    return res.json({
        message: 'post created successfully',
        post
    })



}
const showpostcontroller = async (req, res) => {
    const posts = await postmodel.find();
    const user = req.user;


    res.json({
        message: "post fetched successfully",
        posts,
         


    })
}
module.exports = {
    createpostcontroller,
    showpostcontroller
}