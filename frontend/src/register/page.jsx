import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./register.css";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error("Error registering user");
      if (err.response?.data?.errors) {
        const formattedErrors = {};

        err.response.data.errors.forEach((error) => {
          formattedErrors[error.path] = error.msg;
        });

        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="register-container register-form">
      <div className="register-card">
        <h2>Create Account </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          {errors.username && <p className="error">{errors.username}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit">Register</button>
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
