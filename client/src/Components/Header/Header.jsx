import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, FolderSimplePlus, ListDashes } from "phosphor-react";
import axios from "axios";
// import SearchContext from "../Search/SearchContext";
// import Search from "../Search/Search";
import "./Header.css";

function Header() {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  // const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("http://localhost:5000/user/infor", {
            headers: {
              "Auth-Token": token,
            },
          });

          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  // const searchProducts = async (name) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/product/search/${name}`
  //     );
  //     console.log('Search response:', response.data);
  //     setSearchResults(response.data);
  //     navigate("/search-result?query=${searchTerm}");
  //   } catch (error) {
  //     console.error("Search error:", error);
  //   }
  // };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-result?query=${searchTerm}`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsLoggedIn(false);
  };
  return (
    <header className="custom-header">
      <ul className="menu">
        <Link to="/" className="logo">
          Camping shop
        </Link>
        <li className="menu-item">
          <form className="search-form" onSubmit={handleSearch}>
            {" "}
            <input
              style={{
                borderRadius: "10px 10px 10px 10px",
                overflow: "hidden",
                width: "400px",
                height: "40px",
              }}
              type="search"
              placeholder=" Search"
              aria-label="Search"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </li>

        {!isLoggedIn ? (
          <>
            <li className="menu-item">
              <Link to="/login" className="header-button">
                Login
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/signup" className="header-button">
                Signup
              </Link>
            </li>
          </>
        ) : (
          <>
            {isAdmin ? (
              <>
                <li key="create-link">
                  <Link to="/addProduct" className="header-button">
                    <FolderSimplePlus size={40} weight="fill" />
                  </Link>
                </li>
                <li key="create-link">
                  <Link to="/listOrder" className="header-button">
                    <ListDashes size={40} weight="fill" />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li key="cart-link">
                  <Link to="/cart" className="header-button">
                    <ShoppingCart size={40} weight="fill" />
                  </Link>
                </li>
              </>
            )}

            <li className="menu-item">
              <Link to="/" onClick={logout} className="header-button">
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* <SearchContext.Provider value={searchResults}>
    
        <Search />
      </SearchContext.Provider> */}
    </header>
  );
}

export default Header;
