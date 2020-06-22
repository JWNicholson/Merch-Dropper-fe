import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useSelector } from 'react-redux';
import MerchDropperLogo from "../assets/MerchDropperLogo.JPG";
import { axiosWithEnv } from "../utils/axiosWithEnv";
import QuoteError from "./Modals/QuoteError";

const StripeCheckoutButton = ({ price, domain, history }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_BMXGPoL1peDqHyy42iFEoAMg00l0M6PNex";
  //const publishableKey = 'pk_live_3zwsNFDgIC2nJd4h7F9Y5K8s00exa06IRd'; //Uncomment this line for when stripe is collecting Live payments. Make sure to also change the environment variable on the Backend to the Live key.
  // WE COULD ALSO keep the test key and make a if/else like we have done with the urls so that it stays in test mode during development

  let config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // grabs the orderToken to complete payment process and send to backend calculate application fee
  const tokenSelector = useSelector(state => state.QuoteReducer.quote)
  
  const onToken = token => {
    token.domain_name = domain;
    token.orderToken = tokenSelector.quote.orderToken;
    axiosWithEnv()
      .post("/api/payments", {
        amount: priceForStripe,
        token,
        config,
      })
      .then(res => {
        alert("payment successful");
        //history.push("/products");
        history.push(`/${domain}`);
      })
      .catch(error => {
        console.dir("payment error", error);
        alert("There was an issue with your payment.");
        history.push(`${token.domain_name}/checkout`)
      });
  };

  
  return (
      <StripeCheckout
        label="Finish Checkout"
        name="MerchDropper"
        billingAddress={true}
        shippingAddress={false}
        zipCode={true}
        currency='USD'
        image={`${MerchDropperLogo}`} // might be cause of 400 stripe bug
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
    />
  );
};

export default withRouter(StripeCheckoutButton);
