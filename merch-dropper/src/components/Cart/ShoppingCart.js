import React from 'react';
import ShoppingCartItem from './ShoppingCartItem';
import { connect } from 'react-redux';
import { removeFromCart } from '../../store/actions';

const ShoppingCart = (props) => {
     console.log('cart props', props)
    return (
        <div>
            {/* <NavBar /> */}
            {/*{props.cart.cart.map(product => (*/}
            {props.cart.map(product => (
                <ShoppingCartItem key={product.id} product={product} removeFromCart={props.removeFromCart} />
            ))}
        </div>
    )
};

const mapStateToProps = (state, props) => {
     console.log('state from shoppingcart', state.CartReducer.cart)
    return {
        cart: state.CartReducer.cart
    }
}


export default connect(mapStateToProps, { removeFromCart })(ShoppingCart);



