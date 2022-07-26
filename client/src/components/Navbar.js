import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { menuData } from "../data/MenuData";
import { FaBars } from "react-icons/fa";
import { DispatchContext, StateContext } from "../context/GlobalContext";
import { USER_LOGOUT } from "../context/constants/userConstants";

function Navbar({ toggleDropdown }) {
  const { user } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const history = useHistory();
  const dropdownRef = useRef(null);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [attop, setAtTop] = useState(true);
  const logout = () => {
    dispatch({ type: USER_LOGOUT });
    history.push("/")
  };

  useEffect(() => {
    let eventListener = window.addEventListener("scroll", (e) => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 120) {
        if (attop === true) setAtTop(false);
      } else {
        if (attop === false) setAtTop(true);
      }
    });

    return () => window.removeEventListener("scroll", eventListener);
  }, [attop]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showUserOptions &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowUserOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, showUserOptions]);

  return (
    <nav className="Nav_nav" style={{ background: attop === true ? "transparent" : "#272727" }} attop={attop}>
      <Link className="NavLink_nav Logo_nav" to="/">Dashboard</Link>
      <FaBars className="MenuBars_nav" onClick={toggleDropdown} />
      <div className="NavMenu_nav">
        {menuData.map((item, index) => (
          <Link className="NavLink_nav" to={item.link} key={index}>
            {item.title}
          </Link>
        ))}
        { user && user.userType === "Customer" &&
          <Link className="NavLink_nav" to = "/suggest">Suggested Property</Link>}
      </div >
      <div className="NavBtn_nav">
        {user && user.auth ? (
          <div className="UserProfile_nav"
            onClick={() => setShowUserOptions(!showUserOptions)}
          >
            {showUserOptions && (
              <div className="ProfileMenu_nav" ref={dropdownRef}>
                {user.userType === "Admin" && (
                  <div>
                    <div className="MenuItem_nav" onClick={() => history.push("/admin")}>
                      Users
                    </div>
                    <div className="MenuItem_nav" onClick={() => history.push("/addhome")}>
                      Realtor
                    </div>
                  </div>
                )}
                {user.userType === "Realtor" && (
                  <div className="MenuItem_nav" onClick={() => history.push("/addhome")}>
                    Homes
                  </div>
                )}
                {user.userType === "Customer" && (
                  <div className="MenuItem_nav" onClick={() => history.push("/showHomes")}>
                    Show Homes
                  </div>
                )}
                <div className="MenuItem_nav" onClick={logout}>Logout</div>
              </div>
            )}
          </div>
        ) : (
          <div style={{display: "contents"}}>
            <Link
              className="Button_link"
              style={{ margiLeft: "1rem" }}
              primary="true"
              to="/login"
              >
              Login
            </Link>
            <Link
              className="Button_link"
              style={{ margiLeft: "1rem" }}
              primary="true"
              to="/register"
            >
              Register
            </Link>
          </div>
        )}
    </div>
    </nav >
  );
}

export default Navbar;
