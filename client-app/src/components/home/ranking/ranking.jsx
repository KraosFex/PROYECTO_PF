import { useDispatch, useSelector } from "react-redux";
import { getranking } from "../../../../redux/actions";
import UserRank from "../userRank/userRank";
import style from "./ranking.module.css";

export default function Ranking() {
    const { topTem } = useSelector((store) => store);
    const dispatch = useDispatch();
    if (topTem.length === 0) { getranking()(dispatch) }
    let usuarios = topTem

    let divs = function(e,i){
        if(i>=0 && i<3){
            var imagen = "https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f94"+(i+7)+".png";
            var clase = i=== 0? "medalla": "medalla"+(i+1) ;
        }
        if(i===3 || i===4 ){
            var imagen = "https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f396.png";
            var clase = "medalla"+(i+1)
        }
        if(i>=5){
            var imagen = "https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f3c5.png";
            var clase = "medalla6"
        }
        return <div className={style.puesto}>
             <img className={style[clase]} alt="" src={imagen} />
             <label className={style.usuario}>{i+1}.{e.username}</label>
        </div>
    }
    return (<div className={style.All}>
        <h1 className={style.h1}>RANKING</h1>
        <div className={style.Contenedor}>
            {usuarios.length > 0  ? <div className={style.Contenedor2}>
                {usuarios.map((e,i)=> divs(e,i))}
            </div> : <img className={style.cargando} src ="https://acegif.com/wp-content/uploads/loading-25.gif" alt=""/>}
            <UserRank />
        </div>
    </div>)
}

