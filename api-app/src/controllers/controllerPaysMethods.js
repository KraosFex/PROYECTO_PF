const Stripe = require('stripe');
const User = require("../model/modelUser.js");


let meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const payStripe = async (req, res) => {
  const { idUser, amount, id, fecha, description } = req.body;
  try {
    var user = await User.findById(idUser).catch(() => res.status(500).send({ message: "Usuario invalido", success: false }).send())
    let date = new Date().toString().split(" ")
    let vencido = user.Vencimiento.split(" ")
    if (user.isPremium && (vencido[2] > date[3] || (meses.findIndex((u) => u === date[1]) > meses.findIndex((u) => u === vencido[0])) || (meses.findIndex((u) => u === date[1]) === meses.findIndex((u) => u === vencido[0]) && date[2] > vencido[1]))) {
      res.status(404).send({ message: "Ya eres Premium, y no se ha vencido tu ultimo pago, tu proximo pago es el :" + user.Vencimiento, success: false }).end()
      return
    }
    const stripe = new Stripe(process.env.STRIPE_KEY)
    let payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description,
      payment_method: id,
      confirm: true
    }).catch((err) => res.status(500).send({ message: err.raw, success: false }).end())
    if (payment.status === "succeeded") {
      var user = await User.findByIdAndUpdate(idUser, {
        isPremium: true,
        Vencimiento: fecha
      }, { new: true })
      res.send({ message: "Genial, tu compra ha sido procesada correctamente", success: true, user }).end()
      return
    }
  }
  catch (err) {
    res.status(500).send({ success: false })
  }
};
module.exports = { payStripe };
