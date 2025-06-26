import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `transition ${
      isActive ? "text-blue-400 underline" : "hover:text-blue-400"
    }`;

  return (
    <nav className="bg-white/10 backdrop-blur-md text-white p-4 rounded-b-2xl shadow-md flex justify-between items-center px-8">
      <h1 className="text-2xl font-semibold tracking-wider">💸 Expense Tracker</h1>
      <div className="flex gap-6 text-sm font-medium">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/add" className={linkClass}>Add Expense</NavLink>
        {!token ? (
          <>
            <NavLink to="/login" className={linkClass}>Login</NavLink>
            <NavLink to="/register" className={linkClass}>Register</NavLink>
          </>
        ) : (
          <button onClick={handleLogout} className="hover:text-red-400 transition">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
