import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import ProductCard from "./ProductCard";
import { connect } from "react-redux";
import { addToCart } from "../store/actions";
import { Container, Row, Col } from "reactstrap";
import "../App.css";
import { axiosWithEnv } from "../utils/axiosWithEnv";

const ProductDisplayDomain = ({ products, addToCart, match, location }) => {
  const [shirts, setShirts] = useState([]);
  const [connected, setConnected] = useState(false)
  let storeID = 0;
  const { domain_name } = useParams();
  localStorage.setItem("domain_name", domain_name);
  
  useEffect(() => {
    axiosWithEnv()
      .get(`/api/stores/domain/${domain_name}`)
      // axios
      // .get(
      //   `https://merch-dropper.herokuapp.com/api/stores/domain/${domain_name}`
      // )
      .then((res) => {
        storeID = res.data.id;
        localStorage.setItem("storeID", storeID);
        setConnected(res.data.active)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        axiosWithEnv()
          .get(`/api/products/store/${storeID}`)
          // axios
          // .get(
          //   `https://merch-dropper.herokuapp.com/api/products/store/${storeID}`
          // )
          .then((res) => {
            setShirts(res.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      });
  }, [match.params, domain_name]);

  return (
    <>
      {shirts.length !== 0 && connected ? (
        <Container style={{display: "flex"}}>
          <Row>
            {/* <Col > */}
              {shirts.map((product, id) => (
                <ProductCard
                  key={id}
                  url={product.thumbnailURL}
                  name={product.productName}
                  design={product.design}
                  price={product.price}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            {/* </Col> */}
            </Row>
          
        </Container>
      ) : (
        <div style={{ height: "65vh", textAlign: "center" }}>
          <h2>🚧 SHOP UNDER CONSTRUCTION 🚧</h2>
          <h4>Come back at launch!</h4>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  // console.log("state in products", state);
  return {
    cart: state.CartReducer.cart,
    products: state.ProductReducer.products,
  };
};

export default connect(mapStateToProps, { addToCart })(ProductDisplayDomain);
