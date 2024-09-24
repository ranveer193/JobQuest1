const jwt = require("jsonwebtoken");
const secretkey = "Ran12$&uim^%"

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
        user_name: user.user_name,
        email: user.email,
        mobile_no: user.mobile_no,
        job: user.job,
        skills:user.skills,
    }, secretkey);
}

function getUser(token) {
    try {
        return jwt.verify(token,secretkey);
    }
    catch(error){
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}