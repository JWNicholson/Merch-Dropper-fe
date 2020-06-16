import {
  ADD_CART_PRODUCT,
  REMOVE_CART_PRODUCT,
  CLEAR_CART_PRODUCT,
  TOGGLE_CART,
  RESET_CART
} from "../actions";
import initialState from './initialState';

const addProductToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
}

const removeProductFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ? {
        ...cartItem, quantity: cartItem.quantity - 1
    } : cartItem
    )
}



const CartReducer = (state = initialState, action) => {
    let cart = state.cart;

    switch (action.type) {
      case ADD_CART_PRODUCT:
        return {
          ...state,
          cart: addProductToCart(state.cart, action.payload),
        };

      case REMOVE_CART_PRODUCT:
        return {
          ...state,
          // cart: cart.filter(item => item.id !== action.payload)
          cart: removeProductFromCart(state.cart, action.payload),
        };

      case CLEAR_CART_PRODUCT:
        return {
          ...state,
          cart: state.cart.filter(
            (cartItem) => cartItem.id !== action.payload.id
          ),
        };

      case TOGGLE_CART:
        return {
          ...state,
          hidden: !state.hidden,
        };
      case RESET_CART:
        return {
          ...state,
          hidden: true,
        };

      default:
        return state;
    }
};

export default CartReducer;