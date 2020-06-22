import React, { useState } from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import {
  FormContainer,
  ExitButton,
  StripeTitle,
  StepContainer,
  StripeButton,
  StripeSkipButton,
  CreateStore,
  ConnectionMessage,
} from "./Styled";
import history from "../../utils/history";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { makeAccount } from '../../utils/makeAccount';

let url;
if (process.env.REACT_APP_BASE_URL === "development") {
  url = "http://localhost:3000/createstore";
} else {
  url = "https://merchdropper.store/createstore";
}
// If user skipped stripe setup earlier grab this boolean from localStorage
const returnToDash = localStorage.getItem("fromSettings")

const getSteps = () => {
  return ["Create Account", "Connect Stripe", "Create Store"];
};

const ConnectStripe = (e) => {
  e.preventDefault();
  history.push(
    "https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_GbPkPOEwM5cWwcBy1WX8mXq7UeB0VlxB&scope=read_write"
  );
  window.location.replace(
    `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_GbPkPOEwM5cWwcBy1WX8mXq7UeB0VlxB&scope=read_write`
  );
};

const SkipSetup = (e) => {
  e.preventDefault();
  if(returnToDash){
    history.push("/dashboard")
    window.location.replace("/dashboard")
    localStorage.removeItem('fromSettings')
  } else {
    console.log(url)
    history.push("/createstore");
    window.location.replace(url);
  }
};

const DevStripeConnect = e => {
    const id = localStorage.getItem('id')
    let account = makeAccount(16);
    const stripeAccount = {
        stripe_account: 'test_' + account
    }
    // console.log(stripeAccount);
    axiosWithAuth()
    .put(`/api/users/${id}`, stripeAccount)
    .then(res =>{
        // console.log('has been put', res)
        if(returnToDash){
            history.push("/dashboard")
            window.location.replace("http://localhost:3000/dashboard")
            localStorage.setItem('fromSettings', false)
        } else {
        history.push('/createstore')
        window.location.replace("http://localhost:3000/createstore")
        }
    })
     
}

const StripeConnect = () => {
  const [queryString, setQueryString] = useState(window.location.search);
  let stripeConnected = false;
  let stripeError = false;
  const [activeStep, setActiveStep] = useState(1);
  let userCode = "";
  const steps = getSteps();
  const profile = JSON.parse(localStorage.getItem("profile"));
  console.log(profile.email);

  if (queryString.includes("error")) {
    stripeError = true;
  }

  if (queryString.includes("code=")) {
    userCode = queryString.substring(queryString.indexOf("code=") + 5);
    console.log(userCode);

    axiosWithAuth()
      .post(`/api/stripe/accounts`, {
        user_code: userCode,
        email: profile.email,
      })
      .then((res) => {
        console.log(res);
      });

    stripeConnected = true;
  }

  return (
    <FormContainer>
      <ExitButton onClick={SkipSetup} />

      <StripeTitle>Connect Stripe</StripeTitle>
      <StepContainer>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </StepContainer>
      {
        //For the initial setup form
        !queryString && (
          <StripeButton onClick={ConnectStripe}>Connect Stripe</StripeButton>
        )
      }
      {
        //For the initial setup form
        (!queryString || stripeError) && (
          <StripeSkipButton onClick={SkipSetup}>Skip for now</StripeSkipButton>
        )
      }
      {   //For connecting to a faked stripe account (will not be active)
        (!queryString && process.env.REACT_APP_BASE_URL === "development") &&
        <button className='dev-stripe' onClick={DevStripeConnect}>Connect 4 Develop</button>
      }
      {queryString && stripeConnected && (
        <ConnectionMessage>Connection was successful!</ConnectionMessage>
      )}
      {
        //If we get a user code back and the connect was successful
        queryString && stripeConnected && (
          <CreateStore onClick={SkipSetup}>Create Store</CreateStore>
        )
      }
      {
        //If the connection was not successful
        stripeError && (
          <StripeButton onClick={ConnectStripe}>Try Again</StripeButton>
        )
      }
    </FormContainer>
  );
};

export default StripeConnect;
