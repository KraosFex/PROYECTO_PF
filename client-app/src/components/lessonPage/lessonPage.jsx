import { useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Vimeo from "@u-wave/react-vimeo";

// redux actions
import { getLesson } from "../../../redux/actions";

// Components
import QuiztCart from "./quiztCart";

// style
import style from "./lessonPage.module.css";

// aqui me traigao la lesson

export default function LessonPage() {
  const [approved, setApproved] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseId, lessonId } = useParams();

  const IdOflesson = parseInt(lessonId);

  useEffect(() => {
    const lesson = dispatch(getLesson(lessonId));
    return console.log(lesson);
  }, [dispatch]);

  const handleApproved = (approved) => {
    setApproved(approved);
  };

  const handelSubmit = () => {
    /*
     * aqui deberia ir la ruta que actuliza la lesson del user
     */

    navigate(`/lesson/${courseId}/${IdOflesson + 1}`);
  };

  return (
    <div className={style.highContainer}>
      {/*ESTA ES TODA LA DATA QUE TRAE EL COMPONENETE DE MOMENTO*/}
      <div className={style.infoContainer}>
        <NavLink to={"/home"}> Volver al home </NavLink>
        <div className={style.video}>
          <Vimeo video={`${lesson._id}`} responsive />
        </div>
        <h4 className={style.description}>Una description</h4>
        <hr />
        <QuiztCart
          questions={questions}
          handleApproved={handleApproved}
          approved={approved}
        />
        <button disabled={approved} onClick={handelSubmit}>
          {" "}
          Siguiente leccion
        </button>
      </div>
    </div>
  );
}
