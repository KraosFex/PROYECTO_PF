// libraries
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { themeSwitcher } from "../../../../redux/actions/index.js";

//  styles
import { ThemeProvider } from "styled-components";
import darkTheme from "./navbarUserBlack.module.css";
import lightTheme from "./navbarUserLight.module.css";

//  icones
import FavoriteIcon from "../../../icons/Favorite";
import Moon from "../../../icons/moon";
import CodeIcon from "../../../icons/code.jsx";
import Discord from "../../../icons/Discord.jsx";
import CursoIcon from "../../../icons/libro.jsx";
import Notification from "../../../icons/notification";
import Sun from "../../../icons/sun";
import Arrows from "../../../icons/arrows.jsx";
import { setArrowDirection } from "../../../../redux/actions/index.js";
import Logout from "../../logout/logout.jsx";

function NavBarUser() {
  const dispatch = useDispatch();

  const isLogged = useSelector((store) => store.isLogged);
  const user = useSelector((store) => store.user);
  const theme = useSelector((store) => store.theme);
  const direction = useSelector((store) => store.arrowDirection);

  let body;
  let style;

  if (theme === "light") body = "#272727";
  else if (theme === "dark") body = "#F7F7F7";

  const [active, setActive] = useState(false);
  const [activeArrow, setActiveArrow] = useState(false);

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
    dispatch(setArrowDirection("left"));
  };

  const arrowDir = () => {
    if (direction === "left") dispatch(setArrowDirection("right"));
    if (direction === "right") dispatch(setArrowDirection("left"));
    setActiveArrow(!activeArrow);
  };

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
        <div className={style.arrows} onClick={arrowDir} data-arrow-button>
          <Arrows />
        </div>
        <div className={activeArrow ? style.icon21Active : style.icon21}>
          <div onClick={() => switcher()}>
            {theme === "light" ? <Sun /> : <Moon />}
          </div>
        </div>
        <div className={activeArrow ? style.icon2Active : style.icon2}>
          <NavLink to="/courses">
            <CursoIcon />
          </NavLink>
        </div>

        <div className={activeArrow ? style.icon2Active : style.icon2}>
          <NavLink to="#">
            <Notification />
          </NavLink>
        </div>
        {/* <div className={style.icon4}>
          <NavLink to="#">
            <CodeIcon />
          </NavLink>
        </div> */}
        <div className={style.icon4}>
          <NavLink to="/courses">
            <CursoIcon />
          </NavLink>
        </div>
        <div className={activeArrow ? style.icon4Active : style.icon4}>
          <NavLink to="#">
            <Discord />
          </NavLink>
        </div>
        <div className={style.username}>
          <h2 className={style.username}>{user.username}</h2>
        </div>
        <div data-dropdown className={style.dropdown}>
          <input
            type="image"
            src={
              isLogged
                ? user.Image
                : "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
            }
            data-dropdown-button
            className={activeArrow ? style.icon3Active : style.icon3}
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
            {isLogged ? (
              <Logout />
            ) : (
              <>
                <NavLink to="/login" data-dropdown-button>
                  Log In
                </NavLink>
                <NavLink to="/register" data-dropdown-button>
                  Registrarse
                </NavLink>
              </>
            )}
            {user.isAdmin ? (
              <NavLink to="/users" data-dropdown-button>
                Users
              </NavLink>
            ) : null}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default NavBarUser;
