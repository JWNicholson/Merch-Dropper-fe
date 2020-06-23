import React from "react";
import "../../App.css";
import styled from "styled-components";

const TopSlider = ({ garment, setGarment }) => {
  return (
    <SliderBox>
      <h2>Vertical Offset - {garment.offSetFromTop} in.</h2>
      <input
        type="range"
        name="offSetFromTop"
        min="0"
        max="12"
        step=".25"
        value={garment.offSetFromTop}
        onChange={(e) => {
          setGarment({ ...garment, [e.target.name]: e.target.value });
        }}
      />
    </SliderBox>
  );
};

export default TopSlider;

const SliderBox = styled.div`
  margin-bottom: 5px;
  margin-left: 25px;

  h2 {
    margin-top: 10px;
    margin-left: 10px;
    font-weight: 700;
  }

  input[type="range"] {
    height: 29px;
    -webkit-appearance: none;
    // margin-top: 10px;
    padding: 0 10px;
    width: 350px;
    border-radius: 7px;
    background: none;
  }
  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    width: 350px;
    height: 8px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #4455ee;
    border-radius: 6px;
    border: 1px solid #4455ee;
  }
  input[type="range"]::-webkit-slider-thumb {
    box-shadow: 2px 2px 4px #828282;
    border: 1px solid #000000;
    height: 20px;
    width: 24px;
    border-radius: 6px;
    background: #f0f7ff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7px;
  }
  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #4455ee;
  }
  input[type="range"]::-moz-range-track {
    width: 350px;
    height: 8px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #4455ee;
    border-radius: 6px;
    border: 1px solid #4455ee;
  }
  input[type="range"]::-moz-range-thumb {
    box-shadow: 2px 2px 4px #828282;
    border: 1px solid #000000;
    height: 20px;
    width: 24px;
    border-radius: 6px;
    background: #f0f7ff;
    cursor: pointer;
  }
  input[type="range"]::-ms-track {
    width: 350px;
    height: 8px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  input[type="range"]::-ms-fill-lower {
    background:#4455ee;
    border: 1px solid #4455ee;
    border-radius: 12px;
    box-shadow: 0px 0px 0px #000000;
  }
  input[type="range"]::-ms-fill-upper {
    background:#4455ee;
    border: 1px solid #4455ee;
    border-radius: 12px;
    box-shadow: 0px 0px 0px #000000;
  }
  input[type="range"]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 2px 2px 4px #828282;
    border: 1px solid #000000;
    height: 20px;
    width: 24px;
    border-radius: 6px;
    background: #f0f7ff;
    cursor: pointer;
  }
  input[type="range"]:focus::-ms-fill-lower {
    background: #4455ee;
  }
  input[type="range"]:focus::-ms-fill-upper {
    background: #4455ee;
  }
`;
