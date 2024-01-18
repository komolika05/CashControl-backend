const { ObjectId } = require("mongodb");
const { getOtp } = require("../models/otp");

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
        const userCollection = getOtp();
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
        res
          .status(500)
          .json({ success: false, message: "Internal server error." });
      }
    },
  };
  
  module.exports = userOtp;