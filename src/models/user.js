const { getDB } = require("../db/mongo");

function getCollection() {
  const db = getDB();
  const collection = db.collection("user");
  return collection;
}

module.exports = { getCollection };
