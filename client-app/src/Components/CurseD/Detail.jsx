import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import style from "./Curse.module.css"
export default function CardD() {
    let id= useParams().id;
    const { CurseDetail } = useSelector((state) => state);
    return (
    <div className={style.Container}>
        <h1>{CurseDetail.name || "Nombre del curso"}</h1>
        
    </div>
    )
}