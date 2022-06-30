import { useDispatch, useSelector } from "react-redux";
import { getRanking } from "../../../../redux/actions";
import NotFound from "../../../NotFound/NotFound";
import style from "./ranking.module.css";

export default function Ranking() {
  const dispatch = useDispatch();
  const { topTen } = useSelector((store) => store);
  if (topTen[0] === "No hay usuarios") {
    getRanking()(dispatch)
    return <NotFound type={2} />
  }
  let usuarios = topTen;

  let divs = function (e, i) {
    if (i >= 0 && i < 3) {
      var imagen =
        "https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f94" +
        (i + 7) +
        ".png";
      var clase = i === 0 ? "medalla" : "medalla" + (i + 1);
    }
    if (i === 3 || i === 4) {
      var imagen =
        "https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f396.png";
      var clase = "medalla" + (i + 1);
    }
    if (i >= 5) {
      var imagen =
        "https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f3c5.png";
      var clase = "medalla6";
    }
    return (
      <div key={e._id} className={style.puesto}>
        <img className={style[clase]} alt="" src={imagen} />
        <label className={style.usuario}>
          {i + 1}.{e.username}
        </label>
      </div>
    );
  };
  return (
    <div className={style.flexContainer}>
      <div className={style.All}>
        <h2> RANKING</h2>
        <div className={style.Contenedor}>
          {usuarios.length > 0 ? (
            <div className={style.Contenedor2}>
              {usuarios.map((e, i) => divs(e, i))}
            </div>
          ) : (
            <img
              className={style.cargando}
              src="https://acegif.com/wp-content/uploads/loading-25.gif"
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
}
