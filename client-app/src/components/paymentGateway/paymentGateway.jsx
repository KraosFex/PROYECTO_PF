/*//npm i react-stripe-checkout e import
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

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
  }

  return stripePromise;
};

const PaymentGateway = () => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const item = {
    price: "price_1LEK25Kjg0F9xTQTeGbXFs86",
    quantity: 1,
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/Home`,
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);

  return (
    <div className="checkout">
      <h1>Stripe Checkout</h1>
      <p className="checkout-title">Design+Code React Hooks Course</p>
      <p className="checkout-description">
        Learn how to build a website with React Hooks
      </p>
      <h1 className="checkout-price">$19</h1>
      <img className="checkout-product-image" src="#" alt="Product" />
      <button
        className="checkout-button"
        onClick={redirectToCheckout}
        disabled={isLoading}
      >
        <div className="grey-circle">
          <div className="purple-circle">
            <img className="icon" src="#" alt="credit-card-icon" />
          </div>
        </div>
        <div className="text-container">
          <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
        </div>
      </button>
    </div>
  );
};

export default PaymentGateway;
