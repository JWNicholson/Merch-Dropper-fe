import React, { Fragment } from "react";
import styled from "styled-components";

const HorizontalAlign = ({ garment, setGarment }) => {
  const { designPlacement } = garment;

  return (
    <Fragment>
      <HorizontalSelect
        className="designBtn btn-primary"
        name="designPlacement"
        value={designPlacement}
        onChange={(e) =>
          setGarment({
            ...garment,
            [e.target.name]: e.target.value
          })
        }>
        <option value="L">Left</option>
        <option value="LC">Center-Left</option>
        <option value="C">Center</option>
        <option value="RC">Right-Center</option>
        <option value="R">Right</option>
      </HorizontalSelect>
    </Fragment>
  );
};

export default HorizontalAlign;

const HorizontalSelect = styled.select`
  margin: 10px 0 0 138px;
  border-radius: 4px;
  background-color: #4455ee;
  &:visited {
    background-color: #4455ee;
  }
  &:active {
    background-color: #4455ee;
  }
  &:hover {
    background-color: rgb(69, 86, 238, .87);
    color: #fff
  }
`;


