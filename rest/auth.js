const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("./config");

function createToken(user) {
    const payload = {
        userId: user.id,
        username: user.username
    };
    return jwt.sign(payload, config.secret, { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, config.secret);
    } catch (err) {
        return null;
    }
}

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

function comparePasswords(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    createToken,
    verifyToken,
    hashPassword,
    comparePasswords
};


