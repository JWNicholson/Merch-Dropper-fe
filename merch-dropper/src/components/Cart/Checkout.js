
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import { axiosWithEnv } from '../../utils/axiosWithEnv'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import StripeCheckoutButton from "../StripeButton";
import QuoteError from "../Modals/QuoteError"
import {initialQuoteState} from "../../store/reducers/QuoteReducer";
// import {addAddress, getQuote, setQuote} from "../../store/actions"


import {
  selectCartItems,
  selectCartTotal,
} from "../../store/Selectors/cart.selectors";
import {
  addToCart,
  removeFromCart,
  clearItemFromCart,
  setQuote,
  getQuote
} from "../../store/actions/index";
import Spinner from '../Component-Styles/Spinner';

const CheckoutPage = ({
  cart,
  total,
  match,
  addItem,
  removeItem,
  clearItem,
}) => {
const [checkError, setCheckError] = useState(false)
const [ready, setReady] = useState(false)
 const quote = useSelector(state => state.QuoteReducer.quote)
  const dispatch = useDispatch();
  const { domain_name } = match.params;
  const sendQuote = useSelector(state => state.QuoteReducer.sendQuote)
  const FunctionTotal=(a,b,c) => {
      return a+b+c
    }
  const orderToken = quote.quote.orderToken
    
  useEffect(() => {  
       axiosWithEnv()
        .get(
          `/api/stores/domain/${domain_name}`
        )
        // axios
        // .get(
        //   `https://merch-dropper.herokuapp.com/api/stores/domain/${domain_name}`
        // )
      .then((res) => {
        dispatch(getQuote(sendQuote))
        setTimeout(()=>{
          setCheckError(true) // make the modal wait until the dispatch has been sent
          setReady(true)
        }, 2000)
        if (Number(res.data.id) !== Number(localStorage.getItem("storeID"))) {
          localStorage.setItem("storeID", Number(res.data.id));
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        // future note to add modal for better errors
      });
      
  }, [match.params, domain_name,]);

  return (
    quote.quote   ? 
    <CheckoutPageWrapper className="checkout-page">
       {!orderToken && checkError  ? <QuoteError /> : null}
      <CheckoutHeader className="checkout-header">
        <HeaderBlock className="header-block">
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock className="header-block">
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock className="header-block">
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock className="header-block">
          <span>Unit Price</span>
        </HeaderBlock>
        <HeaderBlock className="header-block">
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cart
        .filter(
          (item) => item.storeID === Number(localStorage.getItem("storeID"))
        )
        .map((cartItem) => (
          // <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          <CheckoutItemWrapper key={cartItem.id} className="checkout-item">
            <ImageWrapper className="image-container">
              <ImageContainer src={cartItem.thumbnailURL} alt="item" />
            </ImageWrapper>
            <DescriptionWrapper className="description">
              {cartItem.description}
            </DescriptionWrapper>
            <QuantityWrapper className="quantity">
              <Arrow className="arrow" onClick={() => removeItem(cartItem)}>
                &#10094;
              </Arrow>
              <ValueDiv className="value">{cartItem.quantity}</ValueDiv>
              <Arrow className="arrow" onClick={() => addItem(cartItem)}>
                &#10095;
              </Arrow>
            </QuantityWrapper>
            <PriceWrapper className="price">${cartItem.price}</PriceWrapper>
            <RemoveButton
              className="remove-button"
              onClick={() => clearItem(cartItem)}
            >
              &#10005;
            </RemoveButton>
          </CheckoutItemWrapper>
        ))}
        <SubTotal className="subtotal">
          <span>SubTotal ${total.toFixed(2)}</span><br/>
          <span>Tax: ${quote.quote.tax.toFixed(2)}</span><br/>
          <span>Shipping: {cart.length <= 0 ? "$0" : `${quote.quote.shipping.toFixed(2)}`} </span>
        </SubTotal>
      <Total className="total">
        <span>Total: {cart.length <= 0 ? "$0" :`${FunctionTotal(total, quote.quote.tax, quote.quote.shipping).toFixed(2)}`}</span>
      </Total>
      {ready ? 
        <StripeCheckoutButton price={FunctionTotal(total, quote.quote.tax, quote.quote.shipping)} domain={domain_name} />
        :
        <Spinner />
      }

    </CheckoutPageWrapper>
    : <div>Redirecting to Checkout</div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addToCart(item)),
  removeItem: (item) => dispatch(removeFromCart(item)),
  clearItem: (item) => dispatch(clearItemFromCart(item)),
});

const mapStateToprops = createStructuredSelector({
  cart: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToprops, mapDispatchToProps)(CheckoutPage);

const CheckoutPageWrapper = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
  @media (max-width: 600px) {
    font-size: 0.75rem;
    width: 80%;
  }
`;

const CheckoutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`;

const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }
`;

const SubTotal = styled.div`
margin-top: 30px;
margin-left: auto;
font-size: 15px;
`

const Total = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 25px;
`;
const CheckoutItemWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;
const ImageWrapper = styled.div`
  width: 23%;
  padding-right: 15px;
`;

const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
`;

const DescriptionWrapper = styled.span`
  width: 23%;
  display: flex;
  font-size: 1rem;
  padding-right: 1rem;
`;
const QuantityWrapper = styled.span`
  display: flex;
  width: 23%;
`;
const PriceWrapper = styled.span`
  width: 23%;
`;
const Arrow = styled.div`
  cursor: pointer;
`;

const ValueDiv = styled.span`
  margin: 0 10px;
`;
const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;
