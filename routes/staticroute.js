const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    return res.render("home", {
        user: req.user,
    });
})

router.get("/profile", (req, res) => {
    return res.render("profile", {
        user:req.user,
    });
})

router.get("/login", (req, res) => {
    return res.render("login");
})

router.get("/signup", (req, res) => {
    return res.render("signup");
})

module.exports = router;