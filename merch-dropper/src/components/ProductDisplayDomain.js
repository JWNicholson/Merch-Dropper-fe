import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import ProductCard from "./ProductCard";
import { connect } from "react-redux";
import { addToCart } from "../store/actions";
import { Container, Row, Col } from "reactstrap";
import "../App.css";

const ProductDisplayDomain = ({ products, addToCart, match, location }) => {
  // console.log('productdisplay/products', products)
  const [shirts, setShirts] = useState([]);
  let storeID = 0;
  const { domain_name } = useParams();
  localStorage.setItem("domain_name", domain_name)
  // filters products by user associated store
  useEffect(() => {
    // GET request to 'stores/domain/${match.params.domain_name}'
    axios
      .get(
        `https://merchdropper-production.herokuapp.com/api/stores/domain/${domain_name}`
      )
      .then((res) => {
        storeID = Number(res.data.id);
        localStorage.setItem("storeID", storeID);
        console.log(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        axios
          .get(
            `https://merchdropper-production.herokuapp.com/api/products/store/${storeID}`
          )
          .then((res) => {
            console.log(res);
            setShirts(res.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      });
  }, [match.params, domain_name]);

  return (
    <Container fluid="true" className="container-margin">
      {/*<NavBar />*/}
      <Row>
        <Col sm="7" className="flex ">
          {shirts.map((product, id) => (
            <ProductCard
              url={product.thumbnailURL}
              name={product.productName}
              design={product.design}
              price={product.price}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </Col>
      </Row>
    </Container>
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
