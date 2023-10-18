const JWT = require("jsonwebtoken");

const secret = "$hradheshJain@71";

function createTokenForUser(user){
    console.log("token",user);
    const payload = {
        _id: user._id, 
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role,
        username: user.username,
    };
    const token = JWT.sign(payload, secret);
    return token;
};

function validateToken(token) {
    const payload = JWT.verify(token, secret);
    return payload;
};

module.exports = {
    createTokenForUser,
    validateToken,
  };

