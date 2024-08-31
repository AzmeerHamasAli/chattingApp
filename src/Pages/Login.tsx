import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export const Login = () => {
  const [number, setNumber] = useState("");
  const [sent, setSent] = useState(false);
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    const protocol = import.meta.env.VITE_API_REQUEST_PROTOCOL;
    const domain = import.meta.env.VITE_API_REQUEST_DOMAIN;
    const url = `${protocol}://${domain}`;
    await axios.post(`${url}/sendOTP`, { to: number }).then((res: any) => {
      if (res.status === 200) {
        setSent(true);
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    });
  };
  const verifyOtp = async () => {
    const protocol = import.meta.env.VITE_API_REQUEST_PROTOCOL;
    const domain = import.meta.env.VITE_API_REQUEST_DOMAIN;
    const url = `${protocol}://${domain}`;
    await axios
      .post(`${url}/verifyOTP`, { to: number, otpCode: otp })
      .then((res: any) => {
        console.log(res.data);
        Cookies.set("token", res.data.token);
        if (res.status === 200) {
          navigate("/");
        } else {
          alert(res.data.message);
        }
      });
  };
  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-[300px] bg-white flex flex-col gap-4 px-8 py-4">
        <div className="flex flex-col">
          <label htmlFor="">Phone Number</label>
          <input
            type="text"
            disabled={sent}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="border disabled:bg-gray-200 disabled:text-gray-400 rounded-lg px-4 py-2"
          />
        </div>
        {sent && (
          <div className="flex flex-col">
            <label htmlFor="">Verficication</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />
          </div>
        )}
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={() => {
            sent
              ? otp.length > 0 && verifyOtp()
              : number.length > 0 && sendOtp();
          }}
        >
          {sent ? "Verify OTP" : "Send Code"}
        </button>
      </div>
    </div>
  );
};
