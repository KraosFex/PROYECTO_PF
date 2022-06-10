import { NavLink } from "react-router-dom";

import style from "./landing.module.css";

const Landing = () => {
  return (
    <div className={style.containerHeader}>
      <div className={`${style.container} ${style.containerMain}`}>
        <div className={style.item}>
          <h1>CodeLearn</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia,
            deserunt rerum. Aspernatur, quos. Quasi dolores earum, non minus
            ipsa iure sunt, odio distinctio assumenda ullam sit ea perferendis
            quaerat facilis?
          </p>

          <div className={style.containerButton}>
            <NavLink to="Home">
              <button> ir a conocer los cursos </button>
            </NavLink>

            <NavLink to="Register">
              <button> Registrarme </button>
            </NavLink>
          </div>
        </div>
        <div className={style.item}>
          <img
            className={style.img}
            src="../../../public/img/Landing_Draw.svg"
            alt="Landing"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
