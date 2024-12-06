import React, { useState, useEffect } from "react";
import "./navbar.css";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("navBar");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const account = localStorage.getItem("account_name");
    const type = localStorage.getItem("user_type");
    if (token && account) {
      setIsLoggedIn(true);
      setAccountName(account);
      setUserType(type);
    } else {
      setIsLoggedIn(false);
      setAccountName("");
      setUserType(null);
    }
  }, [isLoggedIn]);

  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  const removeNavbar = () => {
    setActive("navBar");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("account_name");
    setIsLoggedIn(false);
    setAccountName("");
    setShowLogout(false);
    navigate("/");
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <>
      <section className="navBarSection">
        <header className="header flex">
          <div className="logoDiv">
            <a href="#" className="logo flex">
              <h1>
                <MdOutlineTravelExplore className="icon" />
                Travel
              </h1>
            </a>
          </div>

          <ul className="outerNavLists flex">
            <li className="navItem">
              <span className="navLink" onClick={() => navigate("/")}>
                Trang chủ
              </span>
            </li>
            <li className="navItem">
              <span className="navLink" onClick={() => navigate("#")}>
                Hoạt động
              </span>
            </li>
            <li className="navItem">
              <span className="navLink" onClick={() => navigate("#")}>
                Dịch vụ
              </span>
            </li>
            <li className="navItem">
              <span className="navLink" onClick={() => navigate("#")}>
                Thông tin
              </span>
            </li>
            <li className="navItem">
              <span className="navLink" onClick={() => navigate("#")}>
                Tin tức
              </span>
            </li>
            <li className="navItem">
              <span className="navLink" onClick={() => navigate("#")}>
                Liên lạc
              </span>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="navItem">
                  <span
                    className="navLink"
                    onClick={() => navigate("/register")}
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                  >
                    Đăng ký
                  </span>
                </li>

                <li className="navItem">
                  <span
                    className="navLink"
                    onClick={() => navigate("/login")}
                    style={{
                      backgroundColor: "#3F51B5",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                  >
                    Đăng nhập
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="navItem">
                  <span className="navLink" onClick={toggleLogout}>
                    Chào, {accountName}
                  </span>
                </li>
              </>
            )}
          </ul>

          <div className={active}>
            <ul className="navLists flex">
              <li className="navItem">
                <span className="navLink" onClick={() => navigate("#")}>
                  Bảo hiểm du lịch
                </span>
              </li>
              <li className="navItem">
                <span className="navLink" onClick={() => navigate("#")}>
                  Sân chơi
                </span>
              </li>
              <li className="navItem">
                <span className="navLink" onClick={() => navigate("#")}>
                  Làm đẹp & Spa
                </span>
              </li>
              <li className="navItem">
                <span className="navLink" onClick={() => navigate("#")}>
                  Du thuyền
                </span>
              </li>
              <li className="navItem">
                <span className="navLink" onClick={() => navigate("#")}>
                  Wi bu
                </span>
              </li>
              <li className="navItem">
                <span className="navLink" onClick={() => navigate("#")}>
                  Phiếu quà tặng
                </span>
              </li>
              <li className="navItem">
                <span className="navLink" onClick={() => navigate("#")}>
                  Khuyến mãi
                </span>
              </li>
            </ul>

            <button className="btn">
              <span onClick={() => navigate("#")}>Đặt vé ngay</span>
            </button>

            <div onClick={removeNavbar} className="closeNavbar">
              <AiFillCloseCircle className="icon" />
            </div>
          </div>

          <div onClick={showNav} className="toggleNavbar">
            <TbGridDots className="icon" />
          </div>
        </header>
      </section>

      {showLogout && (
        <>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              position: "fixed",
              top: "70px", 
              right: "33rem",
              zIndex: 1001, 
              backgroundColor: "white", 
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            {userType === "1" && (
              <li
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <button
                  className="logoutButton"
                  onClick={() => navigate("/tourist-account")}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    textDecoration: "none",
                    width: "100%",
                  }}
                >
                  Đi đến trang User
                </button>
              </li>
            )}
            {userType === "2" && (
              <li
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <button
                  className="logoutButton"
                  onClick={() => navigate("/staff/")}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    textDecoration: "none",
                    width: "100%",
                  }}
                >
                  Đi đến trang Tour Guide
                </button>
              </li>
            )}
            {userType === "0" && (
              <li
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <button
                  className="logoutButton"
                  onClick={() => navigate("/admin-dashboard")}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    textDecoration: "none",
                    width: "100%",
                  }}
                >
                  Đi đến trang Admin
                </button>
              </li>
            )}
            <li
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <button
                className="logoutButton"
                onClick={handleLogout}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                Đăng xuất
              </button>
            </li>
          </ul>
        </>
      )}
    </>
  );
};

export default Navbar;
