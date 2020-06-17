import React, { useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import InventoryCard from "./InventoryCard";
import { axiosWithEnv } from "../../utils/axiosWithEnv";
import axios from "axios";
import { ADD_PRODUCT_STATE_SUCCESS } from "../../store/actions";

// The purpose of the InventoryList component is to create a list of products that exist in the user's inventory. 

function InventoryList({ history }) {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);

  // This useEffect performs a series of axios.get requests to retrieve the user's inventory from the back end anytime the dashboard component is loaded. 
  // First, the user's email is retrieved from localStorage and set to "email". 
  // Second, a GET request is made to retrieve the user object from the backend using the user's email in order to obtain the userID. 
  // The userID is then used in the next GET request to obtain the user's store object so the final GET request can be made to retrieve the inventory of the desired store.
  // This multi-step process was necessary because we don't keep userID in localStorage, and the store table in the back end is not connected to a user's email.
  // This should be a series of axiosWithAuth requests, but we ran into issues implementing axiosWithAuth in the Inventory components where the inventory would only load with plain axios calls.  
  useEffect(() => {
    async function getInventory() {
      const { email } = JSON.parse(localStorage.getItem("profile"));

      const resUser = await axiosWithEnv().get(
        `/api/users/email/${email}`
      );
      const userID = resUser.data.id;
      const resStore = await axiosWithEnv().get(
        `/api/stores/user/${userID}`
      );
      setStores(resStore.data);
      const storeID = resStore.data.id;
      const resProducts = await axiosWithEnv().get(
        `/api/products/store/${storeID}`
      );
      setProducts(resProducts.data);
      dispatch({type: ADD_PRODUCT_STATE_SUCCESS, payload: resProducts.data})
    }
    getInventory();
  }, []);

  return (
    <>
      {products.length === 0 && (
        <p style={emptyInventoryStyle}>
          Add items to your store to see them here
        </p>
      )}
      {products.map((product) => (
        <InventoryCard
          key={product.id}
          fullSizeURL={product.fullSizeURL}
          history={history}
          shirtID={product.product_id}
          id={product.id}
        />
      ))}
    </>
  );
}

export default InventoryList;

// This styling is to create a big empty div to display the text "Add items to your store to see them here"
const emptyInventoryStyle = {
  margin: "250px auto",
  fontSize: "24px",
};