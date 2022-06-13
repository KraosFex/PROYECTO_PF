import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FindCourse } from "../../../redux/actions";
import style from "./Curse.module.css"

import CardD from "./Detail";
import Aside from "../home/aside/aside";
import Profile from "../home/profile/profile";


export default function CurseD() {
    let id= useParams().id;
    const dispatch = useDispatch();
    FindCourse(id)(dispatch)
    return (
    <div  className={style.Detail}>
        <CardD />
        <Aside />
      <Profile />
    </div>
    )
}
