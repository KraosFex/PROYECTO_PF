import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { findCourse } from "../../../../redux/actions";
import style from "./courseDark.module.css";
import CardD from "../article";

export default function CurseD(props) {
  let id = useParams().id;
  const dispatch = useDispatch();
  findCourse(id)(dispatch);
  return (
    <div className={style.Detail}>
      <CardD theme={props.theme} dispatch={dispatch} />
    </div>
  );
}
