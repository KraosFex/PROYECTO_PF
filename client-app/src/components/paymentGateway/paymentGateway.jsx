import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Premium } from '../../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import style from "./paymentGateway.module.css"

const stripePromise = loadStripe('pk_test_51LFUVvA8axHMWg4IbzM18cLI1cIUBXdzdQXFeuYR8wG3mnRTcazOmb4fS7lmWUYn95D7bRe4uAdDDC4DrxH2vDUK004ZMldw6F');
let meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const CheckoutForm = ({ user }) => {
    let { Time } = useParams();
    let [respuesta, setRespuesta] = useState({});
    let stripe = useStripe();
    let elements = useElements();
    const dispatch = useDispatch()

    async function handleSubmit(e) {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: elements.getElement(CardElement) })
        let date = new Date().toDateString().split(" ");
        let mes = meses.findIndex(e => e === date[1]);
        if (!error) {
            var respuesta = {}
            if (Time === "Year") {
                date = `${date[1]} ${1 + parseInt(date[2])} ${parseInt(date[3]) + 1}`
                const { id } = paymentMethod
                respuesta = await Premium({
                    id,
                    amount: 350, // 4200/12 Se hace un monto mensual pero con precio anual //USD*100
                    date,
                    description: "Pago por un mes",
                    idUser: user._id
                })(dispatch)
            }
            if (Time === "Mes") {
                if (mes === 11) { date = `${meses[0]} ${1 + parseInt(date[2])} ${1 + parseInt(date[3])}` }
                else { date = `${meses[mes + 1]} ${1 + parseInt(date[2])} ${date[3]}` }
                const { id } = paymentMethod
                respuesta = await Premium({
                    id,
                    amount: 1450,//USD*100
                    date,
                    description: "Pago por un año",
                    idUser: user._id
                })(dispatch)
            }
            // setRespuesta(respuesta)
            console.log(respuesta)
            return
        }
        else { console.log(error) }
    }
    if (respuesta.success) { return <div>Pago exitoso</div> }
    return (
        <form onSubmit={(e) => { handleSubmit(e) }} className={style.body}>

            <div className={style.container}>
                <div className={style.card}>
                    <button className={style.proceed}><svg className={style.sendicon} width="24" height="24" viewBox="0 0 24 24">
                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                    </svg></button>
                    <img src="https://seeklogo.com/images/V/VISA-logo-62D5B26FE1-seeklogo.com.png" className={style.logo_card} />
                    <img src="https://1000marcas.net/wp-content/uploads/2019/12/logo-Mastercard.png" className={style.logo_card} />
                    <img src="https://1000marcas.net/wp-content/uploads/2020/03/logo-American-Express.png" className={style.logo_card} />
                    <label>Card number:</label>
                    <input id="user" type="text" className={style.input_cardnumber} placeholder="1234 5678 9101 1121" />
                    <div>
                        <label>Name:</label>
                        <input className={style.name} placeholder="XXXXXXXXX XXXXXX" /></div>
                    <div><label className={style.toleft}>CCV:</label>
                        <input className={style.toleft_ccv} placeholder="321" /></div>
                </div>
                <div className={style.receipt}>
                    <div className={style.col}><p>Cost:</p>
                        <h2 className={style.seller}>{Time === "Year" ? "$40 usd" : "$14.5 usd"}</h2><br />
                        <p>Name:</p>
                        <h2 className={style.seller}>CodeLine</h2>
                    </div>
                    <div className={style.col}>
                        <p>Numero de Tarjeta:</p>
                        <CardElement className={style.tarjeta} />
                        <p>Nombre que figura en la tajeta:</p>
                        <input className={style.datos} placeholder="Nombre..." />
                        <p>Correo Electronico:</p>
                        <input className={style.datos} placeholder="Email..." defaultValue={user.email} />
                        <p>Numero de telefono:</p>
                        <input className={style.datos} type="celular" />
                    </div>
                    <div className={style.abajo}>
                        <p className={style.comprobe}>This information will be sended to your email</p>
                <label>{ }</label>
                    </div>
                </div>
                
            </div>


        </form>)
}

export default function App() {
    const { user } = useSelector((store) => store);
    const { type } = useParams();
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm user={user} type={type} />
        </Elements>
    );
};