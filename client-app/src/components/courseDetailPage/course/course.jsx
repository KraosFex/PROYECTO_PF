import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { findCourse } from "../../../../redux/actions";
import style from "./course.module.css"
import NavBarUser from "../../home/navbarUser/navBarUser";
import CardD from "../article";



export default function CurseD() {
    let id = useParams().id;
    const dispatch = useDispatch();
    findCourse(id)(dispatch)
    return (
    <div  className={style.Detail}>
        <CardD />
        <NavBarUser/>
    </div>
    )
}
