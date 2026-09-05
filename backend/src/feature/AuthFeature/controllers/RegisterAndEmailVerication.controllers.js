import bcrypt from "bcrypt";
import crypto from "crypto";

//model
import AuthModel from "../model/Auth.model.js";
import OtpModel from "../model/Otp.model.js";

//services
import { genrateOtp } from "../utils/Email.utils.js";
import { sendOtp } from "../services/Email.service.js";

/**
 * @name RegisterController
 * @description Register a User and send otp for verfication
 * @access public
 */
export const RegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const ExistingUser = await AuthModel.findOne({ email });

    if (ExistingUser && ExistingUser.isVerified === true) {
      return res.status(400).json({
        message: "Email already exist, Try with different Email",
      });
    }
    if (ExistingUser && ExistingUser.isVerified === false) {
      await AuthModel.deleteOne({ email });
    }

    const passworHash = await bcrypt.hash(password, 10);

    // OTP generation and hashing
    const otp = genrateOtp();
    const otphash = crypto.createHash("sha256").update(otp).digest("hex");
    // DeletePreviousOtp
    await OtpModel.deleteOne({ email });
    // Expires time for otp is 5 min
    const expriresTime = new Date(Date.now() + 5 * 60 * 1000); //In 5 min

    const response = await sendOtp(email, otp);

    if (response) {
      const NewUser = await AuthModel.create({
        username,
        email,
        password: passworHash,
      });

      const OtpEntry = await OtpModel.create({
        userid: NewUser._id,
        email: NewUser.email,
        otphash,
        expiresAt: expriresTime,
      });
      res.status(201).json({
        message: "User Register Sucessfully",
        NewUser: {
          _id: NewUser._id,
          username: NewUser.username,
          email: NewUser.email,
          isVerified: NewUser.isVerified,
          createdAt: NewUser.createdAt,
          updatedAt: NewUser.updatedAt,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `RegisterController ERR :: ${error}`,
    });
  }
};

/**
 * @name VerifyEmailController
 * @description verify the user email with otp and update the user isVerified field to true
 * @access public
 */
export const VerifyEmailController = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!otp) {
      return res.status(400).json({
        message: "OTP is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const OtpDoc = await OtpModel.findOne({ email });

    if (!OtpDoc) {
      return res.status(404).json({
        message: "OTP not found",
      });
    }

    const currentTime = new Date();

    if (currentTime > OtpDoc.expiresAt) {
      await OtpModel.deleteOne({ email });
      await AuthModel.deleteOne({ email });
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    const otpHash = crypto
      .createHash("sha256")
      .update(String(otp))
      .digest("hex");

    if (otpHash !== OtpDoc.otphash) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const user = await AuthModel.findByIdAndUpdate(
      OtpDoc.userid,
      {
        isVerified: true,
      },
      { returnDocument: "after" },
    );

    await OtpModel.deleteOne({
      userid: OtpDoc.userid,
    });

    res.status(200).json({
      message: "Email verified successfully",
      VerifiedUser: {
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: `VerifyEmailController ERR :: ${error}`,
    });
  }
};

/**
 * @name ResendOtpController
 * @description Delete the old otp and create a new Otp and send it to the user email
 * @access public
 */
export const ResendOtpController = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }
    const User = await AuthModel.findOne({ email });

    const otp = genrateOtp();
    const otphash = crypto.createHash("sha256").update(otp).digest("hex");
    // Delete the previous otp if it exists
    await OtpModel.deleteOne({ email });
    // Expires time for otp is 5 min
    const expriresTime = new Date(Date.now() + 5 * 60 * 1000); //In 5 min

    const response = await sendOtp(email, otp);
    if (response) {
      const OtpEntry = await OtpModel.create({
        userid: User._id,
        email: User.email,
        otphash,
        expiresAt: expriresTime,
      });
      res.status(200).json({
        message: "New Otp has been send to your Register Email",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `ResendOtpController ERR :: ${error}`,
    });
  }
};
