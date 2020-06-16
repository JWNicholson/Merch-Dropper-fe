import React, { useState } from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import DevAuth from './components/Auth/DevAuth'
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import ProductDisplay from "./components/ProductDisplay";
import ProductDisplayDomain from "./components/ProductDisplayDomain";
import CheckoutPage from "./components/Cart/Checkout";
import Home from "./components/Home.js";
import ShoppingCart from "./components/Cart/ShoppingCart";
import DesignShirt from "./components/Shirt/DesignShirt";
import Dashboard from "./components/Dashboard/Dashboard";
import LearnMore from "./components/LearnMore";
import StripeSetup from "./components/Onboarding/StripeSetup";
import Redirect from "./components/Redirect";
import CreateStore from "./components/Onboarding/CreateStore";
import AddProductToTable from "./components/Shirt/AddProductToTable.js";
import initialShirtState from "./components/Shirt/initialShirtState";
import ShippingAddress from "./components/Cart/ShippingAddress.js"
import initialState from "./store/reducers/initialState"

function App() {
  const [design, setDesign] = useState(initialShirtState.designInfo);
  const [garment, setGarment] = useState(initialShirtState.garment);
  const [product, setProduct] = useState(initialState.products)
  const [thumbRender, setThumbRender] = useState();
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/develop" component={DevAuth} />
        <Route exact path="/cart" component={ShoppingCart} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          exact
          path="/addproduct"
          render={(props) => <AddProductToTable garment={garment} design={design}{...props} />}
        />
        <PrivateRoute
          exact
          path="/products"
          render={(props) => <ProductDisplay {...props} />}
        />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/createstore" component={CreateStore} />
        <Route
          exact
          path="/designshirt"
          render={(props) => (
            <DesignShirt
              design={design}
              setDesign={setDesign}
              garment={garment}
              setGarment={setGarment}            
              thumbRender={thumbRender}
              setThumbRender={setThumbRender}
              product={product}
              setProduct={setProduct}
              {...props}
            />
          )}
        />
        <Route exact path="/:domain_name/shippingAddress" component={ShippingAddress} />
        <Route exact path="/learnmore" component={LearnMore} />
        <Route exact path="/redirect" component={Redirect} />
        <Route exact path="/stripe-setup" component={StripeSetup} />
        <Route
          exact
          path="/:domain_name"
          render={(props) => <ProductDisplayDomain {...props} />}
        />
        <Route exact path="/:domain_name/checkout" component={CheckoutPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
