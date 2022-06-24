import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getCourseByName } from "../../../../redux/actions";
import style from "./courseDark.module.css";
import CardD from "../article";

export default function CurseD(props) {
  let name = useParams().name;
  const dispatch = useDispatch();
  getCourseByName(name)(dispatch);
  return (
    <div className={style.Detail}>
      <CardD theme={props.theme} />
    </div>
  );
}
