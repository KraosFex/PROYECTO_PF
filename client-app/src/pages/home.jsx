import React from "react";
import style from "../styles/Pages/home.module.css";

function Home() {
  return (
    <div className={style.flexContainer}>
      <div className={style.container}></div>
      <div className={style.flexContainer2}>
        <div className={style.container2}></div>
        <div className={style.container2}></div>
      </div>
    </div>
  );
}

export default Home;
