import UserModal from "../Modals/User.Modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendTwilioMessage } from "../Helpers/Sms.js";
import random from "random";

export const Register = async (req, res) => {
  try {
      const { userData } = req.body;
      const { name, email, password, role, number } = userData;
      if (!name || !email || !password || !role || !number) return res.json({ success: false, message: "All fields are mandtory.." })

      const isEmailExist = await UserModal.find({ email: email })
      if (isEmailExist.length) {
          return res.json({ success: false, message: "Email is exist, try diffrent email." })
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new UserModal({ name, email, password: hashedPassword, role, number });
      console.log(user,"usser")
      await user.save();
     
      return res.json({ success: true, message: "User registered Successfully." })
      
  } catch (error) {
      return res.json({ success: false, message: "hiii" })
  }
}

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body.userData;
    if (!email || !password)
      return res.json({ success: false, message: "Fill all Fields" });
    const user = await UserModal.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not Found" });

    if (user.isBlocked)
      return res.json({
        success: false,
        message: "You are blocked report to Admin",
      });

    const isPasswordRight = await bcrypt.compare(password, user.password);
    if (isPasswordRight) {
      const userObject = {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id,
      };
      const expiryTime=user?.role =="Seller"? "4h":"1h";
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{expiresIn:expiryTime});
      return res.json({
        success: true,
        message: "Login Successfull",
        user: userObject,
        token: token,
      });
    }
    return res.json({ success: false, message: "Password is wrong" });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res
        .status(404)
        .json({ status: "error", message: "Token is required" });
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedData) {
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token" });
    }
    const userId = decodedData?.userId;
    const user = await UserModal.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const userObject = {
      name: user?.name,
      email: user?.email,
      role: user?.role,
      _id: user?._id,
    };
    return res.status(200).json({ success: true, user: userObject });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
export const getNumber = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res
        .status(404)
        .json({ success: false, message: "User Id is mandatory" });
    const userNumber = await UserModal.findById(userId).select(
      "number numberVerified"
    );
    if (userNumber) {
      return res.json({
        success: true,
        number: userNumber.number,
        numberVerified: userNumber.numberVerified,
      });
    }
    return res
      .status(404)
      .json({ success: false, message: "Internal Error try again" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const sentOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res.json({ success: false, message: "User Id is mandatory" });
    const userNumber = await UserModal.findById(userId);
    const otp = random.int(100000,999999);
    const message = `Hi your Mobile number verification code is ${otp}`;
    if (userNumber) {
      const responseFromTwilio = sendTwilioMessage(userNumber?.number, message);
      if (responseFromTwilio) {
        userNumber.otpForNumberVerification = otp;
        await userNumber.save();
        return res.json({
          success: true,
          message: "Otp sent to your Mobile Number",
        });
      }
    }
    return res.json({ success: false, message: "User not found" });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { userId,otp } = req.body;
    if (!userId || !otp)
      return res.json({ success: false, message: "All Fields mandatory" });
    const verifyNumber = await UserModal.findById(userId);
    if (verifyNumber) {
      if (verifyNumber?.otpForNumberVerification == otp) {
        verifyNumber.numberVerified = true;
        await verifyNumber.save();
        return res.json({
          success: true,
          message: "Your Mobile Number is verified",
        });
      }
    }
    return res.json({ success: false, message: "User not found" });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};
