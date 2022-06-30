import React, { useRef } from "react";
import darkTheme from "./asideDark.module.css";
import lightTheme from "./asideLight.module.css";
import CodeIcon from "../../../icons/code.jsx";
import Discord from "../../../icons/Discord.jsx";
import CursoIcon from "../../../icons/libro.jsx";
import { ThemeProvider } from "styled-components";
import { NavLink } from "react-router-dom";

function NavBar(props) {
  let style = props;
  let navBar = useRef(null);
  let logo = useRef(null);
  const gif1 = "https://i.imgur.com/3PgliiZ.gif";
  const gif2 = "https://i.imgur.com/TUv0sba.gif";
  const png = "https://i.imgur.com/v4fa986.png";

  const handleMouseEnter = () => {
    logo.current.setAttribute("src", gif1);
  };
  const handleMouseLeave = () => {
    logo.current.setAttribute("src", gif2);
  };

  return (
    <ThemeProvider
      theme={
        props.theme === "light" ? (style = lightTheme) : (style = darkTheme)
      }
    >
      <div
        ref={navBar}
        className={style.navbar}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NavLink to="/home">
          <img
            ref={logo}
            src={png}
            alt="logo"
            className={style.logo}
            referrerPolicy="no-referrer"
          />
        </NavLink>
        <div className={style.icon}>
        <NavLink to="/courses"><CursoIcon /></NavLink>
          <NavLink to="/courses" className={style.hide}>
            Cursos
          </NavLink>
        </div>
        <div className={style.icon}>
        <NavLink to="/favoritos"><CodeIcon /></NavLink>
          <NavLink to="/favoritos" className={style.hide}>
           Tus Cursos
          </NavLink>
        </div>
        <div className={style.icon}>
        <a href="https://discord.gg/kwXhPtED" target="_blank" rel="noopener noreferrer"><Discord /></a>
          <a href="https://discord.gg/kwXhPtED" target="_blank" rel="noopener noreferrer" className={style.hide}>
            Unete a Discord!
          </a>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default NavBar;
