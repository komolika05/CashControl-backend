const jwt = require("jsonwebtoken");
const { getCollection } = require("../models/user");

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const userCollection = getCollection();
    const foundUser = await userCollection.findOne({ _id: user.id });

    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = foundUser;
    next();
  });
};

module.exports = { authenticateJWT };
