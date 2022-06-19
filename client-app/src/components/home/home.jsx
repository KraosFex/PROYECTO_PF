import React from "react";
import darkTheme from "./homeDark.module.css";
import lightTheme from "./homeLight.module.css";
import { ThemeProvider } from "styled-components";
import codeLearnGold from "../../icons/codelearngold.png";
import { Link } from "react-router-dom";

function Home(props) {
  let style = props;
  return (
    <ThemeProvider
      theme={
        props.theme === "light" ? (style = lightTheme) : (style = darkTheme)
      }
    >
      <div className={style.flexContainer}>
        <div className={style.container}></div>
        <div className={style.flexContainer2}>
          <div className={style.container2}></div>
          <div className={style.flexContainer3}>
            <div className={style.container31}>
              <img src={codeLearnGold} className={style.logoCont3} />
              <div className={style.container3Text}>
                <h3>Mejora a CodeLearn Gold ahora!</h3>
                <h1>
                  Ayuda a CodeLearn y obtiene mejoras como Pro stats,
                  Comparativas con otros usuarios y mas.
                </h1>
                <div className={style.button}>
                  <Link to="#">Ver mas</Link>
                </div>
              </div>
            </div>
            <div className={style.container3}></div>
            <div className={style.container3}></div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Home;
