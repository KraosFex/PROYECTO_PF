import style from "./card.module.css"

export default function Card({e}) {
    return (
        <div key={e.num} id={e.num} className={style.card}>
            <h4 className={style.h4}>{e.titulo.toUpperCase()+ " "+e.num}</h4>
            <p  className={style.parrafo} >{e.descripcion}</p>
        </div>
    )
}
