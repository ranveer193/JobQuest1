const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const PORT = 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
    const tokencookie = req.cookies?.uid;
    req.user = null;

    if (!tokencookie)
        return next();

    const user = getUser(tokencookie);
    
    req.user = user;
    return next();
});

//Assiging Views as static
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname,"views"));

const { getUser } = require("../MyProject/services/auth");

const { connectMongoose } = require("./connection");   

connectMongoose("mongodb://localhost:27017/MyProject")
    .then(() => console.log("mongoDb Started"))
    .catch((err) => console.log("Error", err));

const staticRoute = require("../MyProject/routes/staticroute");
const userRoute = require("../MyProject/routes/user");
const chatbotRoute = require('../MyProject/routes/chatbot');
const scrapRoute = require("../MyProject/routes/scraping");

app.use("/", staticRoute);
app.use('/user', userRoute);
app.use('/chatbot', chatbotRoute);
app.use('/admin', scrapRoute);

app.listen(PORT, () => {
    console.log("Server Started at PORT : ", PORT);
})