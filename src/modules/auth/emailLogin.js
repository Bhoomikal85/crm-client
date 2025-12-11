import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmailLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form, { withCredentials: true });


      setLoading(false);

      if (res.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        navigate("/contacts-dashboard");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-5 rounded-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4 text-primary">Welcome Back</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
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
            className="btn btn-primary btn-lg w-100 mt-3"
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <small>
            Don't have an account?{" "}
            <a href="/signup" className="text-decoration-none text-primary fw-semibold">
              Sign Up
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default EmailLogin;
