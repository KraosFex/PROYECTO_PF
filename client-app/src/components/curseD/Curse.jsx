import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FindCourse } from "../../../redux/actions";
import style from "./Curse.module.css"

import CardD from "./Detail";



export default function CurseD() {
    let id= useParams().id;
    const dispatch = useDispatch();
    FindCourse(id)(dispatch)
    return (
    <div  className={style.Detail}>
        <CardD />

    </div>
    )
}
