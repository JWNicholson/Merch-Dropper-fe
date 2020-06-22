//import React from "react";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import styled from "styled-components";
import { Button } from "reactstrap";

import { toggleCart, setQuote } from "../../store/actions";
import {initialQuoteState} from "../../store/reducers/QuoteReducer"

const CartDropdownDiv = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 0.25rem;
  border: 1px solid #0369d9;
  background-color: white;
  top: 90px;
  right: 20px;
  z-index: 5;
`;

const CartItemDiv = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;
`;

const CartItemImage = styled.img`
  width: 30%;
`;

const CartItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;
`;

const CartItemsDiv = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const CustomButton = styled(Button)`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 0.75rem;
  background-color: #0369d9;
  color: white;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: white;
    color: #0369d9;
    border: 1px solid #0369d9;
  }
`;



const SingleCartItem = ({ item: { thumbnailURL, price, name, quantity } }) => (
  <CartItemDiv className="cart-item">
    <CartItemImage src={thumbnailURL} alt="item" />
    <CartItemDetails className="item-details">
      <span className="name">{name}</span>
      <span className="price">
        {" "}
        {quantity} x ${price}
      </span>
    </CartItemDetails>
  </CartItemDiv>
);

const CartDropdown = ({ cart, history, dispatch }) => {

  
  const domain_name = localStorage.getItem("domain_name")
  const quote = initialQuoteState.sendQuote;
    return (
     
      <CartDropdownDiv className="cart-dropdown">
        <CartItemsDiv className="cart-items">
          {cart.filter(
            (item) => item.storeID === Number(localStorage.getItem("storeID"))
          ).length ? (
            cart
              .filter(
                (item) =>
                  item.storeID === Number(localStorage.getItem("storeID"))
              )
              .map((cartItem) => (
                <SingleCartItem key={cartItem.id} item={cartItem} />
              ))
          ) : (
            <span className="empty-message">Your Cart is Empty</span>
          )}
        </CartItemsDiv>
        <CustomButton
          onClick={() => {
          
            dispatch(toggleCart());
            dispatch(setQuote({
              ...quote,
              quoteInfo:{
                ...quote.quoteInfo,
                storeID: cart[0].storeId
              },
              spInfo:{
                ...quote.spInfo,
              designId: cart[0].id,
              type: cart[0].type,
              products: 
                cart
            }}))
            history.push(`/${domain_name}/shippingAddress`);
          }}
         
          
        >
          GO TO CHECKOUT
        </CustomButton>
      </CartDropdownDiv>
    
    );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    cart: state.CartReducer.cart,
  };
};

export default withRouter(connect(mapStateToProps)(CartDropdown));
