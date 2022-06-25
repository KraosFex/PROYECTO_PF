//npm i react-stripe-checkout e import
// nota el numero de tarjeta para pruebas es 4242424242424242 puros 42 la cantidad de 8 pares de digitos,
const stripeKey = 'pk_test_51LDY5GIVPvJhAX4qtHGolwRm87FZ0m5e8PoMSMvWDmu5MdYT68Xq6VuVnZM1ry4PzdXu66pk5PfFL8j775zGhpqh00j64vGFxg' //esta es la key publica que genere en la plataforma de stripe

import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';

function PaymentGateway() {


    const [tokenStripe, setTokenStripe] = useState();

    const onToken = (token) => {
        setTokenStripe(token)
    }

    useEffect(() => {
        const makeReq = async () => {
            try {
                const response = await axios.post('http://localhost:3001/api/paysprivate', { tokenId: tokenStripe.id, amount: 500})
                console.log(response) // ya aca hay q ejecutar otra funcion si en esa data es success para agregar el is Premium

            } catch (err) {
                console.error(err)
            }
        }


    }, [tokenStripe])

    return (

        <StripeCheckout
            name="curso" //lo que pongasa aqui lo va a mostart en la ventana de la plataforma
            billingAddress
            shippingAddress
            description="lo que sea"
            amount="50$ :P" //aqui va el monto a pagar esto tambien lo muestrta en la ventana de la plataforma
            token={onToken} //token que genera stripe
            stripeKey={stripeKey}
        >

            <button>
                Pagar Ahora
            </button>
        </StripeCheckout>
    )
}

// estas operaciones van a devolver un objeto:

/*
    card {informacion de la card}
    client_ip: 0.0.0.0
    created: 161616161
    email: email@email.com
    id: este es el token!!!!
    livemode: false
    object: "token",
    type: "card"
    used: false
*/

//despues cuando procesa llega un objeto con mucha instanceOf, alli si me lo regresas para entonces hacer lo del premium, q estoy en eso..

export default PaymentGateway;
