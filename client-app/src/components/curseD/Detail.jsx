import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Card from "./Card";
import style from "./Curse.module.css"

let clase = { title: "Clase", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.    Mollitia, deserunt rerum. Aspernatur, quos.", temas: ["Java", "script", "Front", "Back"], isCompleted: false }

let c = 3
function Change(clase, index, set) {
    if (clase === "next") { set([index, index + c]) }
    if (clase === "prev") { set([index - c, index]) }
}

export default function CardD() {

    let [index, setIndex] = useState([0, c])
    let id = useParams().id;
    const { CurseDetail } = useSelector((state) => state);

    let CursoBase = { id, titulo: "Curso " + id, calificacion: 2000, imagen: "http://www.venturapp.com/wp-content/uploads/2016/03/html_elementos_etiquetas_usadas-680x350.jpg", userIncript: 4567, description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.    Mollitia, deserunt rerum. Aspernatur, quos.    Quasi dolores earum, non minus ipsa iure sunt,    odio distinctio assumenda ullam sit ea perferendis quaerat facilis?Lorem ipsum dolor sit amet, consectetur adipisicing elit.    Mollitia, deserunt rerum. Aspernatur, quos.    Quasi dolores earum, non minus ipsa iure sunt,    odio distinctio assumenda ullam sit ea perferendis quaerat facilis", clases: [{ ...clase, id: 1, isCompleted: true }, { ...clase, id: 2, isCompleted: true }, { ...clase, id: 3, isCompleted: true }, { ...clase, id: 4 }, { ...clase, id: 5 }, { ...clase, id: 6 }, { ...clase, id: 7 }] }

    let Curso = CurseDetail.id ? CurseDetail : CursoBase;
    console.log(Curso)
    let MaxClase = Curso.clases.length
    let list = Curso.clases.slice(index[0], index[1])
    return (
        <div className={style.Container}>
            <div className={style.sup}>
                <div className={style.data}>
                    <h1 className={style.titulo}>{Curso.titulo.toUpperCase()}</h1>
                    <label className={style.label}>Clasification: {Curso.calificacion}</label>
                    <label className={style.label}>Usuarios Inscriptos: {Curso.userIncript}</label>
                </div>
                <img className={style.imagen} alt="" src={Curso.imagen} />
            </div>
            <p>{Curso.description}</p>
            <h4 className={style.h4}>Clases:</h4>
            <div className={style.clases}>
                {index[0] - 1 > 0 ? <button className={style.arrowi} onClick={() => Change("prev", index[0], setIndex)}><img className={style.ai} alt="" src="https://www.pngmart.com/files/3/Up-Arrow-PNG-HD.png" /></button> : null}
                {list.map((e) => <Card key={e.id} e={e} />)}
                {index[1] + 1 <= MaxClase ? <button className={style.arrowd} onClick={() => Change("next", index[1], setIndex)}><img className={style.ai} alt="" src="https://www.pngmart.com/files/3/Up-Arrow-PNG-HD.png" /></button> : null}
            </div>
            <h4 className={style.h4}>Progress:</h4>
            <div className={style.progreso}>
                {Curso.clases.map((e) => <div className={style.ClasP}>{e.isCompleted ? <input key={e.id} checked type="radio" readOnly/>: <input key={e.id} type="radio" disabled/>}{e.title}</div>)}
                {Curso.clases.map((e) => <div className={style.ClasP}>{e.isCompleted ? <input key={e.id} checked type="radio" readOnly/>: <input key={e.id} type="radio" disabled/>}{e.title}</div>)}
                {Curso.clases.map((e) => <div className={style.ClasP}>{e.isCompleted ? <input key={e.id} checked type="radio" readOnly/>: <input key={e.id} type="radio" disabled/>}{e.title}</div>)}
            </div>

        </div>
    )
}