import style from "./card.module.css"

export default function Card({e}) {
    return (
        <div key={e.id} id={e.id} className={style.card}>
            <h4 className={style.h4}>{e.title.toUpperCase()+ " "+e.id}</h4>
            <p  className={style.parrafo} >{e.description}</p>
            {e.temas.map(e=><li key={e}>{e}</li>)}
            </div>
    )
}
