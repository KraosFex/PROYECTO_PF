import { useDispatch, useSelector } from "react-redux";
import { getranking } from "../../../../redux/actions";
import UserRank from "../userRank/userRank";
import style from "./ranking.module.css";

export default function Ranking() {
    const { topten } = useSelector((store) => store);
    const dispatch = useDispatch();
    if (topten.length === 0) { getranking()(dispatch) }
    let usuarios = topten
    console.log(usuarios)

    return (<div className={style.All}>
        <h1 className={style.h1}>RANKING</h1>
        <div className={style.Contenedor}>
            {topten.length > 0  ? <div className={style.Contenedor2}>
                {usuarios[0]?<div className={style.puesto}>
                    <img className={style.medalla} alt="" src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f947.png" />
                    <label className={style.usuario}>1.{usuarios[0].username}</label>
                </div>:null}
                {usuarios[1]?<div className={style.puesto}>
                    <img className={style.medalla2} alt="" src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f948.png" />
                    <label className={style.usuario}>2.{usuarios[1].username}</label>
                </div>:null}
                {usuarios[2]?<div className={style.puesto}>
                    <img className={style.medalla3} alt="" src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f949.png" />
                    <label className={style.usuario}>3.{usuarios[2].username}</label>
                </div>:null}
                {usuarios[3]?<div className={style.puesto}>
                    <img className={style.medalla4} alt="" src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f396.png" />
                    <label className={style.usuario}>4.{usuarios[3].username}</label>
                </div>:null}
                {usuarios[4]?<div className={style.puesto}>
                    <img className={style.medalla5} alt="" src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f396.png" />
                    <label className={style.usuario}>5.{usuarios[4].username}</label>
                </div>:null}
                {usuarios[5]?<div className={style.puesto}>
                    <img className={style.medalla6} alt="" src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f3c5.png" />
                    <label className={style.usuario}>6.{usuarios[5].username}</label>
                </div>:null}
                {usuarios[6]?<div className={style.puesto}>
                    <img className={style.medalla6} alt="" src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f3c5.png" />
                    <label className={style.usuario}>7.{usuarios[6].username}</label>
                </div>:null}
                {usuarios[7]?<div className={style.puesto}>
                    <img className={style.medalla6} alt="" src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f3c5.png" />
                    <label className={style.usuario}>8.{usuarios[7].username}</label>
                </div>:null}
                {usuarios[8]?<div className={style.puesto}>
                    <img className={style.medalla6} alt="" src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f3c5.png" />
                    <label className={style.usuario}>9.{usuarios[8].username}</label>
                </div>:null}
                {usuarios[9]?<div className={style.puesto}>
                    <img className={style.medalla6} alt="" src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f3c5.png" />
                    <label className={style.usuario}>10.{usuarios[9].username}</label>
                </div>:null}
            </div> : <img className={style.cargando} src ="https://acegif.com/wp-content/uploads/loading-25.gif" alt=""/>}
            <UserRank />
        </div>
    </div>)
}
