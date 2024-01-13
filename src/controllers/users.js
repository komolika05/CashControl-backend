const { ObjectId } = require("mongodb");
const { getCollection } = require("../models/user");

const userCtrl = {
  get: async function (req, res, next) {
    try {
      const userId = req.params.userId;
      console.log(`Fetching user with userId: ${userId}`);

      const userCollection = getCollection();
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
  post: async function (req, res) {
    const userCollection = getCollection();
    const userData = await userCollection.insertOne(req.body);
    const user = await userCollection.findOne({
      _id: new ObjectId(userData.insertedId),
    });
    console.log(req.body);
    res.status(200).json(user);
  },
};
module.exports = userCtrl;
