import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import darkTheme from "./navbarUserBlack.module.css";
import lightTheme from "./navbarUserLight.module.css";
import FavoriteIcon from "../../../icons/Favorite";
import CodeIcon from "../../../icons/code.jsx";
import Discord from "../../../icons/Discord.jsx";
import CursoIcon from "../../../icons/libro.jsx";
import Moon from "../../../icons/moon";
import Notification from "../../../icons/notification";
import { ThemeProvider } from "styled-components";
import Sun from "../../../icons/sun";
import { useDispatch, useSelector } from "react-redux";
import { themeSwitcher } from "../../../../redux/actions/index.js";

function NavBarUser() {
  const dispatch = useDispatch();

  const theme = useSelector((store) => store.theme);

  let body;
  let style;

  if (theme === "light") body = "#272727";
  else if (theme === "dark") body = "#F7F7F7";

  const switcher = () => {
    if (theme === "light") {
      //ESTO NO SE DEBE MANEJAR DESDE ACA, TENDRIAMOS QUE UTILIZAR EL ESTADO GLOBAL "theme"
      //  rootElement.childNodes[2].style.setProperty('--backgroundColor',  '#272727');
      document.documentElement.style.setProperty("--backgroundColor", body);
      dispatch(themeSwitcher("dark"));
    } else if (theme === "dark") {
      //ESTO NO SE DEBE MANEJAR DESDE ACA, TENDRIAMOS QUE UTILIZAR EL ESTADO GLOBAL "theme"
      //  rootElement.childNodes[2].style.setProperty(--backgroundColor','#E3E3E3');
      document.documentElement.style.setProperty("--backgroundColor", body);
      dispatch(themeSwitcher("light"));
    }
  };

  const [active, setActive] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const isDropdownButton = e.target.matches("[data-dropdown-button]");
      if (!isDropdownButton && e.target.closest("[data-dropdown]") != null)
        return;

      let currentDropdown;
      if (isDropdownButton) {
        setActive(!active);
      }

      if (!isDropdownButton) {
        setActive(false);
      }
    });
  });

  return (
    <ThemeProvider
      theme={theme === "light" ? (style = lightTheme) : (style = darkTheme)}
    >
      <div className={style.container}>
        <div className={style.icon21}>
          <div onClick={() => switcher()}>
            {theme === "light" ? <Sun /> : <Moon />}
          </div>
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
        <div className={style.icon4}>
          <Link to="#">
            <CodeIcon />
          </Link>
        </div>
        <div className={style.icon4}>
          <Link to="/courses">
            <CursoIcon />
          </Link>
        </div>
        <div className={style.icon4}>
          <Link to="#">
            <Discord />
          </Link>
        </div>
        <div data-dropdown className={style.dropdown}>
          <input
            type="image"
            src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
            data-dropdown-button
            className={style.icon3}
          />
          <div
            className={active ? style.dropdownmenuActive : style.dropdownmenu}
          >
            <NavLink to="/perfil" data-dropdown-button>
              Perfil
            </NavLink>
            <NavLink to="/home" data-dropdown-button>
              Inicio
            </NavLink>
            <NavLink to="/login" data-dropdown-button>
              Log In
            </NavLink>
            <NavLink to="/register" data-dropdown-button>
              Registrarse
            </NavLink>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default NavBarUser;
