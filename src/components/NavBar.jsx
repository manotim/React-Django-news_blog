import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // ✅ Fetch categories once on mount
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/categories/")
      .then((response) => {
        console.log("Fetched categories:", response.data);
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error("Unexpected categories format", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // ✅ Check auth status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="w-[90%] mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-600">
          📰 NewsHub
        </Link>

        <ul className="hidden md:flex space-x-6 items-center">
          {categories.map((cat) => (
            <li key={cat.id}>
              <NavLink
                to={`/category/${cat.slug}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-red-600 font-semibold"
                    : "text-gray-700 hover:text-red-600"
                }
              >
                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
              </NavLink>
            </li>
          ))}

          {!isAuthenticated ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-red-600"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-red-600"
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
