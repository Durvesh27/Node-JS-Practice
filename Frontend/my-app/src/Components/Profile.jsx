import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../MyContext";
import { toast } from "react-hot-toast";
import api from "./Api Config";
const Profile = () => {
  const { state } = useContext(AuthContext);
  const [number, setNumber] = useState();
  const [numberVerified, setNumberVerified] = useState(false);
  const [otp, setOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    const response = await api.post("http://localhost:8000/send-otp", {
      userId: state?.user?._id,
      otp,
    });

    if (response.data.success) {
      setOtpSent(true);
      toast.success(
        "OTP for Mobile Number Verification has been sent to your RMN"
      );
    }
  };

  const verifyOtp = async () => {
    console.log(state?.user?._id, "idd");
    console.log(otp, "otp");
    const response = await api.post("http://localhost:8000/verify-otp", {
      userId: state?.user?._id,
      otp: otp,
    });
    if (response.data.success) {
      console.log("Working");
      setOtpSent(false);
      setNumberVerified(true);
      toast.success("OTP is verified");
    }
  };

  useEffect(() => {
    async function getNumber() {
      try {
        const response = await api.post("http://localhost:8000/get-number", {
          userId: state?.user?._id,
        });
        if (response.data.success) {
          setNumber(response.data.number);
          setNumberVerified(response.data.numberVerified);
        }
      } catch (error) {
        console.log(error, "error");
      }
    }
    if (state?.user?._id) {
      getNumber();
    }
  }, [state]);

  return (
    <div
      style={{
        margin: "auto",
        width: "50%",
        textAlign: "center",
        paddingTop: "50px",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>Profile</h2>
      <h3 style={{ fontWeight: "600" }}>
        Phone Number : <b>{number}</b>
      </h3>
      {numberVerified ? (
        <h4 style={{ marginTop: "10px", color: "green" }}>
          Your Phone Number is Verified
        </h4>
      ) : (
        <button
          onClick={sendOtp}
          style={{ padding: "2px 8px", margin: "10px 0" }}
        >
          Verify your phone Number
        </button>
      )}
      {otpSent && (
        <div>
          <input
            type="text"
            onChange={(event) => setOtp(event.target.value)}
            style={{ padding: "5px 10px", marginRight: "5px" }}
          />
          <button onClick={verifyOtp} style={{ padding: "5px 10px" }}>
            Submit Otp
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
