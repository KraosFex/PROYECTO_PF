import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Card from "./card/card";
import style from "./course/course.module.css"

let lessons = { titulo: "Clase", descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.    Mollitia, deserunt rerum. Aspernatur, quos." , isCompleted: false }

let c = 3

function Change(clase, index, set) {
    if (clase === "next") { set([index, index + c]) }
    if (clase === "prev") { set([index - c, index]) }
}

export default function CardD() {

    let [index, setIndex] = useState([0, c])
    let id = useParams().id;
    const { CurseDetail, user } = useSelector((state) => state);

    let CursoBase = { id, titulo: "Curso " + id, calificacion: 2000, imagen: "http://www.venturapp.com/wp-content/uploads/2016/03/html_elementos_etiquetas_usadas-680x350.jpg", userIncript: 4567, description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.    Mollitia, deserunt rerum. Aspernatur, quos.    Quasi dolores earum, non minus ipsa iure sunt,    odio distinctio assumenda ullam sit ea perferendis quaerat facilis?Lorem ipsum dolor sit amet, consectetur adipisicing elit.    Mollitia, deserunt rerum. Aspernatur, quos.    Quasi dolores earum, non minus ipsa iure sunt,    odio distinctio assumenda ullam sit ea perferendis quaerat facilis", lessons: [{ ...lessons, num: 1, isCompleted: true }, { ...lessons, num: 2, isCompleted: true }, { ...lessons, num: 3, isCompleted: true }, { ...lessons, num: 4 }, { ...lessons, num: 5 }, { ...lessons, num: 6 }, { ...lessons, num: 7 }] }

    let Curso = CursoBase;
    let MaxClase = Curso.lessons.length
    let list = Curso.lessons.slice(index[0], index[1])
    let progress = user.courses? user.courses : CursoBase.lessons.map(e=>{return{course: e, isFavorite:false}})
    let complete = progress.filter(e=> e.course.isCompleted )
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
                {list.map((e) => <Card key={e.num} e={e} />)}
                {index[1] + 1 <= MaxClase ? <button className={style.arrowd} onClick={() => Change("next", index[1], setIndex)}><img className={style.ai} alt="" src="https://www.pngmart.com/files/3/Up-Arrow-PNG-HD.png" /></button> : null}
            </div>
            <h4 className={style.h4}>Progress:</h4>
            <div className={style.bar}>
                <label>{(complete.length/MaxClase*100).toFixed(1)}%</label>
                <input type="range" max={100}  min ={0} readOnly value={complete.length/MaxClase*100}/>
            </div>
            <div className={style.progreso}>
                {progress.map((e) => <div className={style.ClasP} key={e.course.num}>{e.course.isCompleted ? <input checked type="radio" readOnly/>: <input key={e.num} type="radio" disabled/>}{e.course.titulo}</div>)}
                {progress.map((e) => <div className={style.ClasP} key={e.course.num}>{e.course.isCompleted ? <input checked type="radio" readOnly/>: <input key={e.num} type="radio" disabled/>}{e.course.titulo}</div>)}
                {progress.map((e) => <div className={style.ClasP} key={e.course.num}>{e.course.isCompleted ? <input checked type="radio" readOnly/>: <input key={e.num} type="radio" disabled/>}{e.course.titulo}</div>)}
            </div>
            
        </div>
    )
}
