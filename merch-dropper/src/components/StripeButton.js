import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import MerchDropperLogo from "../assets/MerchDropperLogo.JPG";

const StripeCheckoutButton = ({ price, domain, history }) => {
  console.log('the store', domain)
  const devPriceStripe = 1 * 100;  // for testing
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_BMXGPoL1peDqHyy42iFEoAMg00l0M6PNex";
  //const publishableKey = 'pk_live_3zwsNFDgIC2nJd4h7F9Y5K8s00exa06IRd'; //Uncomment this line for when stripe is collecting Live payments. Make sure to also change the environment variable on the Backend to the Live key.

  let config = {
    headers: {
      "Content-Type": "application/json"
    },
  };

  const onToken = token => {
    console.log('token at top', token); // should clear this or at least comment out post feature development
    token.domain_name = domain;
    axios
      .post("http://localhost:5032/api/payments/create-payment-intent", {
        //https://merchdropper-production.herokuapp.com/api/payments/
        amount: priceForStripe,
        token,
        config,
      })
      .then(res => {
        console.log('token in success', token);
        alert("payment successful");
        history.push("/products");
      })
      .catch(error => {
        console.log('token in error', token);
        console.dir("payment error", error);
        alert("There was an issue with your payment.");
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="MerchDropper"
      billingAddress={true}
      shippingAddress={true}
      zipCode={true}
      currency='USD'
      image={`${MerchDropperLogo}`}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default withRouter(StripeCheckoutButton);
