const express = require("express");
const cookieParser = require("cookie-parser");
const authroutes = require("./routes/auth.routes");
const postroutes = require("./routes/post.routes");
const profileroutes = require("./routes/profile.routes");
const cors = require('cors');
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")))
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",
        'https://capgen-7lpn.onrender.com'], credentials: true
}));
app.use("/auth", authroutes);
app.use("/post", postroutes);
app.use("/user", profileroutes);

app.get("*name", (req, res) => {
    res.sendFile(__dirname, "../public/index.html")

})



module.exports = app;