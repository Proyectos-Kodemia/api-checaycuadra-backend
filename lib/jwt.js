const jsonwebtoken = require("jsonwebtoken");
const config = require("./config");

const sign = async (payload) => {
  const secret = config.jwt.secret;
  return await jsonwebtoken.sign(payload, secret);
};

const verifyToken = async (token) => {
  const secret = config.jwt.secret;
  //console.log("secret verify token",secret)
  //console.log ("token....", token)
  return await jsonwebtoken.verify(token, secret)
  
};

module.exports = { sign, verifyToken };
