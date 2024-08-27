import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function UserIndex() {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  return (
    <>
      <div id="user-index">
        <h1>User Index</h1>
        <div className="button-container">
          <button onClick={() => navigate("login")}>Login</button>
          <button onClick={() => navigate("signup")}>Sign Up</button>
        </div>
      </div>
      {token && (
        <button onClick={() => navigate("/myprofile")}>My Profile</button>
      )}
    </>
  );
}

export function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password to login.");
      return;
    }

    try {
      const response = await axios.post(
        "https://bramhan-vidya-api.vercel.app/users/loginuser",
        { email, password }
      );
      if (response.data.token) {
        localStorage.setItem("Token", response.data.token);
        navigate("/myprofile");
        toast.success(<b>Logged in successfully!</b>);
      } else {
        toast.error(<b>Token not found in response.</b>);
      }
    } catch (error) {
      toast.error(<b>Error logging in: {error.message}</b>);
    }
  };

  return (
    <>
      <div className="user-login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
          <p>
            Don't have an account?
            <Link to="/user/signup">Sign up</Link>
          </p>
          <p>
            <Link to="/user/forget-password">Forget password</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export function UserSignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password || !name) {
      toast.error("Please fill in name, email, and password to register.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("https://bramhan-vidya-api.vercel.app/users/adduser", {
        name,
        email,
        password,
      });
      toast.success("OTP sent to your email! Verify it.");
      setOtpSent(true);
    } catch (error) {
      let errorMessage = error.message;
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message;
      }
      toast.error(
        <div>
          <b>Failed to send OTP!</b>
          <p>{errorMessage}</p>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (event) => {
    event.preventDefault();
    if (!otp) {
      toast.error("Please enter OTP to verify.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "https://bramhan-vidya-api.vercel.app/users/verify-otp",
        {
          email,
          otp,
        }
      );
      toast.success("OTP verified successfully!");
      setOtpVerified(true);
      setTimeout(() => navigate("/user/login"), 2000);
    } catch (error) {
      let errorMessage = error.message;
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message;
      }
      toast.error(
        <div>
          <b>Failed to verify OTP!</b>
          <p>{errorMessage}</p>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="user-signup">
        <h1>Sign Up</h1>
        <form onSubmit={otpVerified ? null : handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
          />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
          {otpSent && !otpVerified && (
            <input
              type="number"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              placeholder="Enter OTP"
            />
          )}
          {otpSent && !otpVerified && (
            <button onClick={handleOtpVerify}>Verify OTP</button>
          )}
          {!otpSent && (
            <button type="submit">
              {loading ? <p>Loading...</p> : "Sign Up"}
            </button>
          )}
          <p>
            Already have an account?{" "}
            <Link to="/user/login">Try logging in.</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!otpSent) {
        const response = await axios.post(
          "https://bramhan-vidya-api.vercel.app/users/forget-password",
          { email }
        );
        toast.success(response.data.message);
        setOtpSent(true);
      } else if (otpSent && !otpVerified) {
        const response = await axios.post(
          "https://bramhan-vidya-api.vercel.app/users/reset-password-otp",
          { email, otp }
        );
        toast.success(response.data.message);
        setOtpVerified(true);
      } else if (otpVerified) {
        const response = await axios.post(
          "https://bramhan-vidya-api.vercel.app/users/reset-password",
          {
            email,
            otp,
            newPassword,
          }
        );
        toast.success(response.data.message);
        navigate("/user/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forget-password">
      <h2 className="heading">Forget Password</h2>
      <form onSubmit={handleSubmit}>
        {!otpSent && (
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
          />
        )}
        {otpSent && !otpVerified && (
          <input
            type="number"
            required
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            placeholder="Enter the OTP"
          />
        )}
        {otpVerified && (
          <input
            type="password"
            required
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="Enter your new password"
          />
        )}
        <button type="submit" disabled={loading}>
          {loading
            ? "Loading..."
            : otpVerified
            ? "Reset Password"
            : otpSent
            ? "Verify OTP"
            : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
