const { getDB } = require("../db/mongo");

function getOtp() {
  const db = getDB();
  const otpCollection = db.collection("otp");
  return otpCollection;
}

module.exports = { getOtp };
