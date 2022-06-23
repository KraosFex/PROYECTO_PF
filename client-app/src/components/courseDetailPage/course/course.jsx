// libraries
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// components
import CardD from "../article";

// actions redux
import { findCourse } from "../../../../redux/actions";

//style
import style from "./courseDark.module.css";

export default function CurseD(props) {
  let id = useParams().id;
  const dispatch = useDispatch();
  findCourse(id)(dispatch);
  return (
    <div className={style.Detail}>
      <CardD theme={props.theme} />
    </div>
  );
}
