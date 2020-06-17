import React, { useState, useEffect } from "react";
import axios from 'axios';
import {TextField, MenuItem, Button, Typography } from "@material-ui/core";
import addProduct from "./AddProduct";
import { useStyles } from "../Component-Styles/addProduct-styles.js";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { axiosWithEnv } from "../../utils/axiosWithEnv";
import scalableData from "./scalableData"


Modal.setAppElement("#root");
const AddProductToTable = (props, history) => {
  const classes = useStyles();
  const [stores, setStores] = useState("");
  const data = scalableData(props.garment);
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    description: "",
    storeID: NaN,
    designId: props.design.designId,
    color: data.product.color,
    size: "",
    product_id: data.product.id,
    type: data.design.type
  });
  const [cost, setCost] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  //fetch stores on mount of logged in user
  // get currently logged in user data from localstorage
  //GET userID from this endpoint /api/users/email
  // save the userID
  // GET stores associated from logged in user from endpoint of stores/userID
  //setStore to that list

  useEffect(() => {
    async function getStores() {
      const { email } = JSON.parse(localStorage.getItem("profile"));
      const res = await axiosWithEnv().get(
        `/api/users/email/${email}`
      );
      console.log(res, "res1");
      const userID = res.data.id;
      const res2 = await axiosWithEnv().get(
        `/api/stores/user/${userID}`
      );
      console.log(res2, "res");
      setStores(res.data);
      setProduct(
      { 
        productName: "",
        price: "",
        description: "",        
        designId: props.design.designId,
        color: data.product.color,
        size: "",
        product_id: data.product.id,
        type: data.design.type,
        storeID:res2.data.id
      })
    }
    getStores();
    //get price of product from scalablepress
      
      axiosWithEnv().post('/api/products/price', {
        type: props.garment.printStyle,
        sides: {
          front: 1
        },
          products: [{
            id: "canvas-unisex-t-shirt",
            color: data.product.color,
            size: "med",
            quantity: 1}
          ]
      })
          .then(res => {
             setCost(res.data)
          })
          .catch(err => {
            console.log(err)
          })
  }, [cost.total]);
  

  const handleChange = event => {
    setProduct({
      ...product,
      size:"med",
      [event.target.name]: event.target.value
    });
  };

    //calculate profit per item
  const calcPrice = (e, baseCost = cost.total) => {
    if(product.price){
      return product.price - baseCost
    } else{
      return 0;
    }
  }

  const handleSubmit = async event => {
    event.preventDefault();
    openModal();
    addProduct(props.history, props.garment, product, props.design);
    // setProduct({ ...product,
    //   designID: props.garment.mockUrl.substring(102)
    // })
    // setTimeout(() => {
    //   props.history.push("/dashboard");
    // }, 800);
  };
  console.log(props.garment);
  
  // const shirtColor = props.garment.color;
  const shirtImage = props.garment.mockUrl;
 
  return (
    <div className={classes.addproductContainer}>
      <Modal
        className={classes.modal}
        isOpen={modalIsOpen}
        contentLabel="Modal"
      >
        <Segment className={classes.segment}>
          <Dimmer active>
            <Loader>Adding Product to Inventory</Loader>
          </Dimmer>
        </Segment>
      </Modal>
      <div className={classes.imgContainer}>
        <img
          src={shirtImage}
          className={classes.shirtImg}
          alt="shirt design preview"
        />
      </div>
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            className={classes.createTitle}
            label="Create Title"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            InputProps={{
              disableUnderline: true
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelText
              }
            }}
          />{" "}
          <div className={classes.cost}>
          <TextField
            className={classes.price}
            label="$"
            name="price"
            value={product.price}
            onChange={handleChange}
            InputProps={{
              disableUnderline: true
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelText
              }
            }}
          />{" "}
         <span className={classes.profit}>Profit per item:<strong> ${`${calcPrice().toFixed(2)}`}</strong></span>
          </div>
          <TextField
            className={classes.desc}
            label="Add Product Description"
            name="description"
            multiline
            rows={5}
            value={product.description}
            onChange={handleChange}
            InputProps={{
              disableUnderline: true
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelText
              }
            }}
          />{" "}
          {/* <Typography
                              className={classes.productHeader}
                              variant="h3"
                              gutterBottom
                            >
                              Product:
                            </Typography>
                            <Typography className={classes.product} variant="body1" gutterBottom>
                              Unisex T - Shirt
                            </Typography> */}{" "}
          {/* <Typography className={classes.colorHeader} variant="h3" gutterBottom>
            Color:
          </Typography>{" "}
          <Typography className={classes.color} variant="body1" gutterBottom>
            {" "}
            {shirtColor}{" "}
          </Typography>{" "} */}
          {/* <TextField
                            select
                            className={classes.storeSelect}
                            name="storeID"
                            label="Select Store"
                            value={product.storeID}
                            onChange={handleChange}
                            InputProps={{ disableUnderline: true }}
                          >
                            {stores.map(store => (
                              <MenuItem key={store.id} value={store.id}>
                                {store.store_name}
                              </MenuItem>
                            ))}
                          </TextField> */}{" "}
          <Button
            variant="contained"
            className={classes.addButton}
            type="submit"
          >
            Add Product{" "}
          </Button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};

export default AddProductToTable;