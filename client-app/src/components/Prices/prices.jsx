
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import "./prices.css"

let productos = [
    { name: "Desbloquear Todos los cursos", img: "https://www.nicepng.com/png/full/218-2186702_related-wallpapers-software-de-programacion-png.png", price: [14, 50, " $USD /Mes",], clase: "cardd", link: "/pagar/Mes" },
    { name: "Desbloquear Todos los cursos", img: "https://sites.google.com/site/profeappinventor/_/rsrc/1511509657092/la-programacion-hoy-dia/leng4.png", price: [40, "00", " $USD /Anual",], clase: "cardd best", link: "/pagar/Year" }]
export default function Prices() {
    let theme = useSelector(state=> state.theme)
    return (<div className={theme ==="light"?"body":"body2"}>
        <div className="back">
        <NavLink to={"/Home"}>Cancelar</NavLink>
        </div>
        <div className="Contenedorprecios">{productos.map((e,i) =>
            <div className={e.clase} key={i}>
                <div className="imgBox">
                    <img src={e.img} alt="" className="mouse" />
                </div>
                <div className="contentBox">
                    <h3>{e.name}</h3>
                    <h2 className="price">{e.price[0]}.<small>{e.price[1]}</small>{e.price[2]}</h2>
                    <NavLink to={e.link} className="buy">Buy Now</NavLink>
                </div>
            </div>

        )}</div>
    </div>)
}
