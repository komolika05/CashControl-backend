const express = require("express");
const cors = require("cors");
const { init } = require("./db/mongo.js");
const userCtrl = require("./controllers/users.js");
const { getCollection } = require("./models/user.js");
const userOtp = require("./controllers/otpVerification.js");

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

app.post("/users/login/otp/send", userOtp.send);

app.post("/users/login/otp/verify", userOtp.verify);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
