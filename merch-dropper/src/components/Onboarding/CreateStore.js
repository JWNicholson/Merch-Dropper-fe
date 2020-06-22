import React, { useState } from "react";
import { connect } from "react-redux";
import { postUser } from "../../store/actions";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StripeCTA from "./StripeCTA";
import {
  FormHeader,
  MainContainer,
  CreateStoreForm,
  StepperDiv,
  StoreTextDiv,
  URLPreviewDiv,
  CreateStoreButton,
  SkipCreateStoreButton,
} from "./Styled";

import axios from 'axios';
import { axiosWithEnv } from "../../utils/axiosWithEnv";

// This function is to provide the Material UI Stepper with the names of each step to display.
function getSteps() {
  return ["Create account", "Connect Stripe", "Create store"];
}

// This is styling for the Material UI TextField element where users enter their desired store name that gets converted to their domain name. The width was determined by the UX figma designs.
const useStyles = makeStyles((theme) => ({
  textField: {
    width: "38.2ch",
  },
}));

// This component displays the Create Store form for the user to experiement with store names so they can see how it will be converted to their domain name. The back end stores the store name as it is entered by the user as well as the domain name it gets converted to. The intent of this decision was to save the store name for things like displaying it on the seller's dashboard as well as the storefront a potential customer would see upon visiting the seller's domain.
function CreateStore({ history }) {
  const [storeName, setStoreName] = useState("");
  const [domain, setDomain] = useState("");
  const [activeStep, setActiveStep] = React.useState(2);
  const [isSubmit, setIsSubmit] = useState(false);

  // This code is specific to the Material-UI components for displaying the progress bar (steps 1, 2, 3). This design should be made consistent across all onboarding forms. Each form was designed independently
  const steps = getSteps();
  const classes = useStyles();

  // This change handler watches the TextField input box
  // Then it sets the user's input to storeName
  // And calls the convertToDomain function to convert the user's input to a suitable domain name by removing spaces and special characters
  const handleChange = (e) => {
    setStoreName(e.target.value);
    convertToDomain(e.target.value);
  };

  // This function converts the user's input into their domain by removing any character that isn't A-Z, a-z, or 0-9. The filter could be modified to ma
  const convertToDomain = (string) => {
    let splitString = string.split(/[^A-Za-z0-9]/);
    let joinedString = splitString.join("");
    let domainString = joinedString.toLowerCase();
    setDomain(domainString);
  };

  const profile = JSON.parse(localStorage.getItem("profile"));
  console.log(profile)

  // The callSignUp function sends a post request to the back end to create a new store associated with the logged in user
  // The store_name is the unedited input from the user to be displayed on their dashboard and buyer-facing storefront
  // The domain_name is the edited input from the user to make a clean URL for their store
  const callSignUp = (e) => {
    e.preventDefault();
    setIsSubmit(true);

    axiosWithEnv()
      .post(`/api/stores`, {
        store_name: storeName,
        domain_name: domain,
        email: profile.email,
        id: localStorage.getItem("id")
      })
      .then((res) => {
        // console.log("This is res: ", res);
        setIsSubmit(false);
        alert("Store Created!");
        history.push("/dashboard");
      })
      .catch((err) => {
        setIsSubmit(false);
        console.log("This is error: ", err);
      });
  };

  // This function allows the user to skip the store creation form and be forwarded to the user's dashboard
  const skipToDashboard = (e) => {
    e.preventDefault();
    history.push("/dashboard");
  };

  // if user submits the store creation form, a new route is created based on the user's custom store name
  // if user skips this step, the user is forwarded to /dashboard until they create a custom store name

  return (
    <MainContainer>
      <StripeCTA />
      <CreateStoreForm onSubmit={callSignUp}>
        <FormHeader>Create store</FormHeader>
        <StepperDiv>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </StepperDiv>
        <StoreTextDiv>
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="Store name"
            name="store-name"
            variant="outlined"
            inputProps={{ maxLength: 25 }}
            value={storeName}
            onChange={handleChange}
          />
        </StoreTextDiv>
        <URLPreviewDiv>
          {domain.length < 14 ? (
            // 14 was chosen based on testing different values and could be improved since different characters like l or 1, take up less space than characters like O or M (with the current font) - the font could be changed to one which all characters occupy the same space, and a better value than 14 could be found
            <p>merchdropper.store/{domain}</p>
          ) : (
            <>
              <p style={{ color: "grey" }}>merchdropper.store/</p>
              {/* the base URL is greyed out when the text reaches long enough to be on two lines - this was a UX design decision to highlight the user's input */}
              <p>{domain}</p>
            </>
          )}
        </URLPreviewDiv>
        <CreateStoreButton className='create-store' type="submit">Create store</CreateStoreButton>
        <SkipCreateStoreButton onClick={skipToDashboard}>
          Skip for now
        </SkipCreateStoreButton>
      </CreateStoreForm>
    </MainContainer>
  );
}

const mapStateToProps = (state) => {
  let register = state.RegisterReducer;

  return {
    isFetching: register.isFetching,
    error: register.error,
  };
};

export default connect(mapStateToProps, { postUser })(CreateStore);
