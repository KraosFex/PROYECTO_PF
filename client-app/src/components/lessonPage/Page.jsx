// libraries
import { useState } from "react";
import { useSelector } from "react-redux";
// redux actions 

// style
import style from './lessonPage.module.css';

export default function Page() {

  const { lesson, user } = useSelector(state => state);
  let inicial = []
  if (lesson.titulo) {
    inicial = lesson.quiz.respuestas.map(e => false)
  }
  let [si, setsi] = useState(true);
  let [resp, setresp] = useState(inicial);

  if (!lesson.titulo) { return <></> }

  function Responder(e, index) {
    let newarr = resp.map((ele,i)=> {if(i===index){return e.target.value}return e})
    setresp(newarr)
  }
  function Revisar(){
    let comparativo = resp.map((e,i)=>resp[i]=== lesson.quiz.respuestas[0])
    comparativo
    setsi(false)
  }
  return (
    <div className={style.infoContainer}>
      <div className={style.form}>
        <div className={style.info}>
          <h1 className={style.title}>{lesson.titulo}</h1>
          <hr />
          <p className={style.description}>{lesson.descripcion}</p>
        </div>
        <div className={style.info}>
          <p className={style.description}>{lesson.quiz.data}</p>
          {lesson.quiz ? lesson.quiz.preguntas.map((e, i) =>
            <div key={i} className={style.pregunta}>
              <h3>{e.texto.toUpperCase()}</h3>
              <hr className={style.separar} />
              <div className={style.opciones} >{e.respuestas.map((ele, index) => <><label className={style.input} onClick={(e) => { Responder(e, i) }}>{ele} <input type="radio" key={index} name={"pregunta" + i} value={ele} /></label></>)}</div>
            </div>
          ) : null}
          {si && resp.filter(e => e).length >= lesson.quiz.Resp_min ? <button className={style.Revisar} onClick={()=>Revisar()}>Revisar</button> : null}
        </div>
      </div>
    </div>
  )
}

