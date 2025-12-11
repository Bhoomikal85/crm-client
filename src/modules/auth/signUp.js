import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../redux/config"; 

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${url}/auth/signup`, form, { withCredentials: true });
      setLoading(false);

      if (res.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        navigate("/dashboard");
      } else {
        setError("Signup failed: Invalid server response");
      }
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-5 rounded-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4 text-success">Create Account</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submitSignup}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            disabled={loading}
            className="btn btn-success btn-lg w-100 mt-3"
            type="submit"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-4">
          <small>
            Already have an account?{" "}
            <a href="/email-login" className="text-decoration-none text-primary fw-semibold">
              Login
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Signup;
