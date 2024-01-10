const express = require("express");
const { init } = require("./db/mongo.js");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("I love you Yash!");
});

async function startServer() {
  await init();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();
