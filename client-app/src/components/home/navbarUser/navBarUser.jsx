import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import darkTheme from "./navbarUserBlack.module.css";
import lightTheme from "./navbarUserLight.module.css";
import FavoriteIcon from "../../../icons/Favorite";
import Moon from "../../../icons/moon";
import Notification from "../../../icons/notification";
import { ThemeProvider } from "styled-components";
import Sun from "../../../icons/sun";
import { useDispatch, useSelector } from "react-redux";
import { themeSwitcher } from "../../../../redux/actions/index.js";

function NavBarUser () {

  const dispatch = useDispatch()

  const theme = useSelector((store) => store.theme);
  const [style, setStyle] = useState(lightTheme)

  let body;

  if (theme === "light") body = "#272727";
 else if (theme === "dark") body = "#E3E3E3";


  const switcher = () => {
    if (theme === 'light') {
    //ESTO NO SE DEBE MANEJAR DESDE ACA, TENDRIAMOS QUE UTILIZAR EL ESTADO GLOBAL "theme"
    //  rootElement.childNodes[2].style.setProperty('--backgroundColor',  '#272727');
      document.documentElement.style.setProperty("--backgroundColor", body);
      setStyle(darkTheme)
      dispatch(themeSwitcher('dark'))

    } else if (theme === 'dark'){
      //ESTO NO SE DEBE MANEJAR DESDE ACA, TENDRIAMOS QUE UTILIZAR EL ESTADO GLOBAL "theme"
      //  rootElement.childNodes[2].style.setProperty(--backgroundColor','#E3E3E3');
        document.documentElement.style.setProperty("--backgroundColor", body);
      setStyle(lightTheme)
      dispatch(themeSwitcher('light'))
    }
  };




  return (
    <ThemeProvider
      theme={style}
    >
      <div className={style.container}>
        <div className={style.icon21}>
          <div onClick={() => switcher()}>
          {theme === 'light' ? <Sun /> : <Moon />}
          </div>
        </div>
        <div className={style.icon2}>
          <Link to='#'>
            <FavoriteIcon />
          </Link>
        </div>
        <div className={style.icon2}>
          <Link to='#'>
            <Notification />
          </Link>
        </div>
        <div className={style.icon3}>
          <Link to="Perfil">
            <img src="https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20"></img>
          </Link>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default NavBarUser
