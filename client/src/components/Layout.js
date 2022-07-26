import { useState, useContext } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles, { themes } from "../globalStyles";
import Helmet from "react-helmet";
import Dropdown from "./Dropdown";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { StateContext, DispatchContext } from "../context/GlobalContext";

function Layout({ children, hideFooter, hideNav }) {
  const { theme } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const setTheme = (payload) => {
    dispatch({
      type: "SET_THEME",
      payload,
    });
  };
  return (
    <ThemeProvider theme={themes[theme.selectedTheme]}>
      <Helmet>
        <style type="text/css">{`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');  
    `}</style>
      </Helmet>
      <GlobalStyles />
      <div className="LayoutContainer">
        {hideNav !== true && (
          <Navbar
            toggleDropdown={toggleDropdown}
            setTheme={setTheme}
            theme={theme.selectedTheme}
          />
        )}

        <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown} />
        <div className="Content">{children}</div>
        {!hideFooter && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default Layout;
