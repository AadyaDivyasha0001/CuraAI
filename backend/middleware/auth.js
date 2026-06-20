const jwt = require("jsonwebtoken");

const JWT_SECRET = "curaai_secret";

module.exports = (req, res, next) => {

  const token =
    req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Access Denied"
    });
  }

  try {

    const verified =
      jwt.verify(
        token,
        JWT_SECRET
      );

    req.user = verified;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid Token"
    });

  }
};