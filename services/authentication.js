const JWT = require("jsonwebtoken");

const secret = process.env.SECERT_JWT_TOKEN;

function createTokenForUser(user){
    console.log("token",user);
    const payload = {
        _id: user._id, 
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role,
        username: user.username,
        dob:user.dob,
    };
    const token = JWT.sign(payload, secret);
    return token;
};

function validateToken(token) {
    const payload = JWT.verify(token, secret);
    return payload;
};

function createTokenForGoogleuser(user){
    console.log("token",user);
    const payload = {
        _id: user._id, 
        profilePicture: user.profilePicture,
        role: user.role,
        username: user.username,
        dob:user.dob,
    };
    const token = JWT.sign(payload, secret);
    return token;
};

module.exports = {
    createTokenForUser,
    validateToken,
    createTokenForGoogleuser,
  };

