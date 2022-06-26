import { useState } from "react";
import { useDispatch } from "react-redux";
import { addVotes, getCourses ,findCourse } from "../../../../redux/actions/index";
import "./vote.css";

export default function Stars({ idCurso, idUser, calificacion }) {
  const dispatch = useDispatch()
  let [boton, setBoton] = useState(false);
  function Click() {
    setBoton(true);
    let inputs = document.getElementsByName("rating-star");
    let labels = document.getElementsByClassName("rating__item");
    let max = 5;
    for (let i = 0; i < 5; i++) {
      if (inputs[i].checked) {
        max = inputs[i].id.split("rc")[1];
      }
      if (max === 0 || inputs[i].id.split("rc")[1] <= max) {
        labels[i].children[0].className.baseVal = "starselect";
      } else {
        labels[i].children[0].className.baseVal = "star";
      }
    }
  }
  function SendVote() {
    let inputs = document.getElementsByName("rating-star");
    let max = 0;
    for (let i = 0; i < 5; i++) {
      if (inputs[i].checked) {
        max = inputs[i].id.split("rc")[1];
      }
    }
    if (idCurso && idUser) {
      addVotes(idCurso, {idCurso, calificacion: calificacion + parseInt(max) , idUser: idUser, votes: parseInt(max) })();
    }
    getCourses()(dispatch);
    findCourse(idCurso)(dispatch);
  }
  return (
    <div className="Conteiner_rating">
      <input
        type="radio"
        name="rating-star"
        onChange={(e) => {
          Click(e);
        }}
        className="rating"
        id="rc1"
      />
      <input
        type="radio"
        name="rating-star"
        onChange={(e) => {
          Click(e);
        }}
        className="rating"
        id="rc2"
      />
      <input
        type="radio"
        name="rating-star"
        onChange={(e) => {
          Click(e);
        }}
        className="rating"
        id="rc3"
      />
      <input
        type="radio"
        name="rating-star"
        onChange={(e) => {
          Click(e);
        }}
        className="rating"
        id="rc4"
      />
      <input
        type="radio"
        name="rating-star"
        onChange={(e) => {
          Click(e);
        }}
        className="rating"
        id="rc5"
      />
      <label htmlFor="rc1" className="rating__item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="star"
        >
          <path
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 
                        7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </label>
      <label htmlFor="rc2" className="rating__item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="star"
        >
          <path
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 
                        7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </label>
      <label htmlFor="rc3" className="rating__item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="star"
        >
          <path
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 
                        7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </label>
      <label htmlFor="rc4" className="rating__item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="star"
        >
          <path
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 
                        7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </label>
      <label htmlFor="rc5" className="rating__item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="star"
        >
          <path
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 
                        7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </label>
      {idCurso && idUser && boton ? (
        <button className="boton_send" onClick={() => SendVote()}>
          Send Vote
        </button>
      ) : null}
    </div>
  );
}
