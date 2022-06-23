const stripe = require("stripe")(process.en.STRIPE_KEY);

const payStripe = (req, res) => {
  const { tokenId, amount } = req.body;
  stripe.charges.create(
    {
      source: tokenId,
      amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).send(stripeErr);
      } else {
        res.status(200).send(stripeRes);
      }
    }
  );
};
module.exports = { payStripe };
