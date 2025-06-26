import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 mb-4 bg-white/20 rounded"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-white/20 rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-2 rounded font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
