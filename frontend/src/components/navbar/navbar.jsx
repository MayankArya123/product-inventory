import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";
import API from "../../services/api";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const res = await API.get(`/auth/get-user`);
        setUserName(res?.data?.user?.username);
      } catch (err) {
        console.error("Error fetching user", err);
      }
    };
    fetchLoggedInUser();
  }, [token]);

  return (
    <nav className="navbar">
      <div className="logo">Product Inventory</div>

      <div className="product-create-link">
        {token && <Link to="/product-create"> Add Product</Link>}
      </div>

      <div className="nav-links">
        {token && userName && <span> {userName} </span>}
        <Link to="/">Home</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
