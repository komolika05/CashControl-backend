const { MongoClient } = require("mongodb");

let db;

async function init() {
  const client = await getClient({ URL: "mongodb://0.0.0.0:27017/" });
  db = client.db("cashControl");
}

async function getClient({ URL }) {
  let mClient;
  try {
    mClient = await MongoClient.connect(URL);

    return mClient;
  } catch (err) {
    console.log("Error initializing db", err);
    return Promise.reject(err);
  }
}

function getDB() {
  return db;
}

module.exports = { init, getDB, db };
