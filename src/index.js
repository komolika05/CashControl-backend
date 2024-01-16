const express = require("express");
const cors = require("cors");
const { init } = require("./db/mongo.js");
const userCtrl = require("./controllers/users.js");
const { getCollection } = require("./models/user.js");

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

(async () => {
  try {
    await init();
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error initializing MongoDB:", error);
  }
})();

app.get("/users/:userId", userCtrl.get);
app.post("/users", userCtrl.post);

app.post("/users/login/otp/send", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const otp = "123456";

    const userCollection = getCollection();
    await userCollection.insertOne({ phoneNumber, otp });

    console.log("OTP sent successfully:", phoneNumber, otp);

    res.json({ success: true, message: "OTP sent successfully." });
  } catch (error) {
    console.error("Error requesting OTP:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

app.post("/users/login/otp/verify", async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const userCollection = getCollection();
    const user = await userCollection.findOne({ phoneNumber, otp });

    if (user) {
      console.log("OTP verification successful:", phoneNumber, otp);
      res
        .status(200)
        .json({ success: true, message: "OTP verification successful." });
    } else {
      console.log("Invalid OTP:", phoneNumber, otp);
      res.status(400).json({ success: false, message: "Invalid OTP." });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
