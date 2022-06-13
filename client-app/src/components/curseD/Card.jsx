import style from "./Card.module.css"

export default function Card({e}) {
    return (
        <div key={e.id} id={e.id} className={style.card}>
            <h4 className={style.h4}>{e.name.toUpperCase()+ " "+e.id}</h4>
            <p>{e.description}</p>
            {e.temas.map(e=><li key={e}>{e}</li>)}
            </div>
    )
}