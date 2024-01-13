const { ObjectId } = require("mongodb");
const { getDB } = require("../db/mongo");

const userCtrl = {
  get: async function (req, res, next) {
    try {
      const userId = req.params.userId;
      console.log(`Fetching user with userId: ${userId}`);

      const userCollection = getDB().collection("user");
      const user = await userCollection.findOne({
        _id: new ObjectId(userId),
      });

      if (user) {
        console.log("User found:", user);
        res.status(200).json(user);
      } else {
        console.log("User not found");
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = userCtrl;
