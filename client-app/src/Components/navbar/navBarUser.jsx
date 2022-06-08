import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import darkTheme from "../../styles/Navbar/navbarUserBlack.module.css";
import lightTheme from "../../styles/Navbar/navbarUserLight.module.css";
import FavoriteIcon from "../icons/Favorite";
import Moon from "../icons/moon";
import Notification from "../icons/notification";
import { ThemeProvider } from "styled-components";
import NavBar from "./navBar";
import Home from "../../pages/home";
import Sun from "../icons/sun";

function NavBarUser() {
  const MoonIcon = <Moon />;
  const SunIcon = <Sun />;
  var style = darkTheme;
  const [theme, setTheme] = useState("light");
  const [themeIcon, setThemeIcon] = useState(Moon);
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      setThemeIcon(MoonIcon);
      document.documentElement.style.setProperty(
        "--backgroundColor",
        "#272727 "
      );
    } else {
      setTheme("light");
      setThemeIcon(SunIcon);
      document.documentElement.style.setProperty(
        "--backgroundColor",
        "#E3E3E3 "
      );
    }
  };
  return (
    <ThemeProvider
      theme={theme === "light" ? (style = lightTheme) : (style = darkTheme)}
    >
      <Home theme={theme} />
      <NavBar theme={theme} />
      <div className={style.container}>
        <div className={style.icon21}>
          <Link to="#" onClick={toggleTheme}>
            {themeIcon}
          </Link>
        </div>
        <div className={style.icon2}>
          <Link to="#">
            <FavoriteIcon />
          </Link>
        </div>
        <div className={style.icon2}>
          <Link to="#">
            <Notification />
          </Link>
        </div>
        <div className={style.icon3}>
          <Link to="#">
            <img src="https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20"></img>
          </Link>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default NavBarUser;
