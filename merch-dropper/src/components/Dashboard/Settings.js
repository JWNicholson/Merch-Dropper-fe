import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import history from "../../utils/history";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import {
  SettingsH2,
  SettingsBox,
  StripeH3,
  StripeStatusTitle,
  StripeStatus,
  SettingsContainer,
  StorefrontH3,
  AccountTitle,
  AccountNumber,
  Divider,
  StorefrontStatusTitle,
  StorefrontStatusContainer,
  StorefrontStatusDot,
  StorefrontStatus,
  StorefrontTitle,
  StorefrontName,
  StripeContainer,
  StripeStatusContainer,
  StripeButton,
  AccountContainer,
  StorefrontContainer,
  StorefrontStatusInner,
  StorefrontNameContainer,
} from "./Styled";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { axiosWithEnv } from "../../utils/axiosWithEnv";
const useStyles = makeStyles({
  root: {
    background: "#F8F8F9", // custom style for create store button
  },
});

const Settings = () => {
  let connectStripeURL;
  if (process.env.REACT_APP_BASE_URL === "development") {
    connectStripeURL = "http://localhost:3000/stripe-setup";
  } else {
    connectStripeURL = "https://merchdropper.store/stripe-setup";
  }
  const classes = useStyles();
  const [stripe, setStripe] = useState("");
  const [connected, setConnected] = useState(false);
  const [store, setStore] = useState("");

  useEffect(() => {
    async function getInfo() {
      let profile = JSON.parse(localStorage.getItem("profile"));
      //let profile = {
      // email: 'jthanson238@gmail.com'}; //for Testing on local seeded db

      axiosWithEnv()
        .get(`/api/stripe/${profile.email}`)
        .then((res) => {
          console.log(res.data.user.stripe_account);
          if (res.data.user.stripe_account) {
            setStripe(res.data.user.stripe_account);
            setConnected(true);
            axiosWithEnv().put(`/api/stores/activate/${res.data.user.id}`);
          }
        });

      const res = await axiosWithEnv().get(`/api/users/email/${profile.email}`);

      console.log(res);

      const userID = localStorage.getItem("id");
      const res2 = await axiosWithEnv().get(`/api/stores/user/${userID}`);
      console.log(res2);
      setStore(res2.data.store_name);
    }
    getInfo();
  }, []);

  return (
    <SettingsContainer>
      <SettingsH2>Storefront Settings</SettingsH2>

      <StorefrontStatusContainer>
        <StorefrontStatusTitle>Status:</StorefrontStatusTitle>
        <StorefrontStatusInner>
          <StorefrontStatusDot
            style={
              connected && store !== ""
                ? { backgroundColor: "#28E13B" }
                : { backgroundColor: "red" }
            }
          />
          <StorefrontStatus>
            {connected && store !== "" ? "Online" : "Incomplete"}
          </StorefrontStatus>
        </StorefrontStatusInner>
      </StorefrontStatusContainer>
      <AccountContainer>
        <AccountTitle>Stripe Account Number:</AccountTitle>
        {connected ? (
          <AccountNumber className="stripeaccount">{stripe}</AccountNumber>
        ) : (
          <AccountNumber className="stripeaccount">
            <Link
              className="stripe-cta"
              onClick={() => {
                localStorage.setItem("fromSettings", true);
                history.push("/stripe-setup");
                window.location.replace(connectStripeURL);
              }}
              to="/stripe-setup"
            >
              Connect Stripe
            </Link>
          </AccountNumber>
        )}
      </AccountContainer>
      <StorefrontNameContainer>
        <StorefrontTitle>Store Name:</StorefrontTitle>
        {store ? (
          <StorefrontName>{store}</StorefrontName>
        ) : (
          <AccountNumber>
            <Link to="/createstore">Create Store</Link>
          </AccountNumber>
        )}
      </StorefrontNameContainer>

      <Divider />
    </SettingsContainer>
  );
};

export default Settings;
