const { ObjectId } = require("mongodb");
const { getOtp } = require("../models/otp");
const jwt = require("jsonwebtoken");
const { getCollection } = require("./../models/user");

const userOtp = {
  send: async (req, res) => {
    try {
      const { phoneNumber } = req.body;

      const otp = "123456";

      const userCollection = getOtp();
      await userCollection.insertOne({ phoneNumber, otp });

      console.log("OTP sent successfully:", phoneNumber, otp);

      res.json({ success: true, message: "OTP sent successfully." });
    } catch (error) {
      console.error("Error requesting OTP:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  },

  verify: async (req, res) => {
    try {
      const { phoneNumber, otp } = req.body;
      const otpCollection = getOtp();
      const userCollection = getCollection();

      const storedOtp = await otpCollection.findOne({ phoneNumber });

      if (!storedOtp || storedOtp.otp !== otp) {
        console.log("Invalid OTP:", phoneNumber, otp);
        return res
          .status(400)
          .json({ success: false, message: "Invalid OTP." });
      }

      await otpCollection.deleteOne({ phoneNumber });

      const existingUser = await userCollection.findOne({ phoneNumber });

      if (!existingUser) {
        await userCollection.insertOne({ phoneNumber, name: "" });
        console.log("New user created successfully:", phoneNumber);
      }

      const user = await userCollection.findOne({ phoneNumber });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log("JWT generated successfully");
      res.status(200).json({
        success: true,
        message: "OTP verification successful.",
        token,
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  },
};

module.exports = userOtp;
