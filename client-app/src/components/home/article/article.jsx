import React from "react";
import style from "./article.module.css";

function Article() {
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

export default Article;
