import React from "react";
import NavBar from "../Components/navbar/navBar";
import NavBarUser from "../Components/navbar/navBarUser";
import style from "../styles/Pages/home.module.css";

function Home() {
  return (
    <div className="App">
    <div className={style.flexContainer}>
      <div className={style.container}></div>
      <div className={style.flexContainer2}>
        <div className={style.container2}></div>
        <div className={style.container2}></div>
      </div>
    </div>
    <NavBar />
    <NavBarUser /></div>
  );
}

export default Home;
