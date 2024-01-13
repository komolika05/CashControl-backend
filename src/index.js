const express = require("express");
const { init } = require("./db/mongo.js");
const userCtrl = require("./controllers/users.js");

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
