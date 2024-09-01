import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import apiUrl from "../utils/GetApiUrl";
import { Link, useNavigate } from "react-router-dom";

export default function UserIndex() {
  return (
    <>
      <UserGuide />
    </>
  );
}
export function UserGuide() {
  return (
    <div className="user-guide">
      <h1 className="title">Welcome to Sanatan Dharma!</h1>
      <p className="description">
        This platform is designed to provide a comprehensive resource for
        Hinduism-related information. As an admin, you will be responsible for
        adding and managing data on this platform to ensure its accuracy and
        integrity.
      </p>

      <h2 className="section-title">Rules and Guidelines</h2>
      <p className="section-description">
        Please follow these rules and guidelines to maintain the platform's
        integrity and accuracy:
      </p>
      <ul className="rules-list">
        <li>Verify the accuracy of data before adding it to the platform.</li>
        <li>Ensure that all added data has authentic sources.</li>
        <li>
          Avoid adding content that may be considered offensive or sensitive.
        </li>
        <li>
          Take responsibility for spreading Dharma accurately and respectfully.
        </li>
      </ul>

      <h2 className="section-title">Adding Data</h2>
      <p className="section-description">
        Login to your admin account, then follow these steps:
      </p>
      <ol className="steps-list">
        <li>
          Visit the <Link to="/explore">Explore Page</Link> and choose the type
          of data to add.
        </li>
        <li>Click on the "Add Here" link at the bottom of the page.</li>
        <li>
          Conduct thorough research and utilize AI tools to verify information.
        </li>
        <li>Enter the data in the required fields accurately.</li>
        <li>Click "Submit" to add the data to the platform.</li>
      </ol>

      <h2 className="section-title">Managing Data</h2>
      <p className="section-description">
        Login to your admin account, then follow these steps:
      </p>
      <ol className="steps-list">
        <li>Visit "My Profile" to view all documents created by you.</li>
        <li>
          Click on the "Revise Content" button for the data you want to edit.
        </li>
        <li>Find the data you want to edit or delete.</li>
        <li>Click "Submit" to modify the data.</li>
      </ol>
      <p className="go-back-to-profile">
        <Link to="/myprofile">Return to Your Profile</Link>
      </p>
    </div>
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
      const response = await axios.post(`${apiUrl}/users/loginuser`, {
        email,
        password,
      });
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
      await axios.post(`${apiUrl}/users/adduser`, {
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
      await axios.post(`${apiUrl}/users/verify-otp`, {
        email,
        otp,
      });
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
        const response = await axios.post(`${apiUrl}/users/forget-password`, {
          email,
        });
        toast.success(response.data.message);
        setOtpSent(true);
      } else if (otpSent && !otpVerified) {
        const response = await axios.post(
          `${apiUrl}/users/reset-password-otp`,
          { email, otp }
        );
        toast.success(response.data.message);
        setOtpVerified(true);
      } else if (otpVerified) {
        const response = await axios.post(`${apiUrl}/users/reset-password`, {
          email,
          otp,
          newPassword,
        });
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
