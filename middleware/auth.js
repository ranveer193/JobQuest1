const { getUser } = require("../services/auth");

function checkForAuthuntication(req, res, next) {
    const tokencookie = req.cookies?.uid;
    req.user = null;

    if (!tokencookie)
        return next();

    const user = getUser(tokencookie);
    
    req.user = user;
    return next();
}

// function restrictTo(roles) {
//     return function (req, res, next) {
//         if (!req.user)
//             return res.redirect("/login");
//         if (!roles.includes(req.user.role))
//             return res.redirect("/login");
//         return next();
//     }
// }

module.exports = {
    checkForAuthuntication,
}