import React, {useState, useEffect} from "react";
import "../../App.css";
import styled from "styled-components";
import DesignHandler from "./DesignHandler";
import ThumbDisplay from "./ThumbDisplay";
import Swatch from "./Swatch";
import { Link } from "react-router-dom";
import {useStyles} from "../Component-Styles/addProduct-styles";
import {useSelector} from "react-redux";
import axios from "axios";
import scalableData from "./scalableData.js"



const DesignInputPanel = ({
  design,
  setDesign,
  thumbRender,
  setThumbRender,
  garment,
  setGarment,
  handleScalableMockup,  
  addProduct
}) => {
  const classes = useStyles();

  return (
    <Panel>
      <DesignHandler
        design={design}
        setDesign={setDesign}
        setThumbRender={setThumbRender}
      />
      <ThumbDisplay
        garment={garment}
        setGarment={setGarment}
        thumbRender={thumbRender}
      />

      <Swatch garment={garment} setGarment={setGarment} />

      <ButtonContainer>
        <button
          className={classes.button}
          onClick={handleScalableMockup}
        >
          Preview Design
        </button>
        {garment.mockUrl.length !== 0 ? <Link to="/addproduct" className={classes.button} >
          Save & Continue
        </Link>: null}
        
      </ButtonContainer>
    </Panel>
  );
};

export default DesignInputPanel;

const ButtonContainer = styled.div`
  // padding: 10px;
  display: flex;
  max-width: 300px;
  flex-direction: row;
  justify-content: space-around;
`;
const Panel = styled.div`
  margin: 63px 0 0 15px;

  button {
    margin-bottom: 8px;
  }
`;
