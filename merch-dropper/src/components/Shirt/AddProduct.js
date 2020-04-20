import axios from "axios";

// const product = {
//   productName: "Swarm Collection",
//   description: "Swarm Shirt",
//   price: 83.99,
//   storeID: 1
// };

// this function allows the user to
const addProduct = async (garment, product) => {
  console.log({ garment });
  if (garment.mockUrl === "") {
    alert("Please create a mockup first!");
    return null;
  }

  await (async () => {
    // cloudRes is the response we receive from Cloudinary after making an axios.post with the necessary
    const cloudRes = await axios
      .post(
        "https://api.cloudinary.com/v1_1/dze74ofbf/upload",
        {
          // upload_preset - Name of an upload preset that we defined for our Cloudinary account.
          upload_preset: "cropShrink",
          // tags - An array (using the SDKs) or comma-separated list (for REST API calls) of tag names to assign to the uploaded asset for later group reference.
          tags: "browser_upload",
          // file -
          file: garment.mockUrl
        },
        { "X-Requested-With": "XMLHttpRequest" }
      )
      .catch(err => {
        console.log("error uploading image", err);
      });

    //
    const merchDropRes = await axios
      .post("https://merchdropper-production.herokuapp.com/api/products", {
        ...product,
        fullSizeURL: cloudRes.data.eager[0].secure_url,
        thumbnailURL: cloudRes.data.eager[1].secure_url
      })
      .catch(err => {
        console.log("error uploading image", err);
      });
    console.log(`${merchDropRes.data.productName} added successfully!`);
  })();
  return null;
};

export default addProduct;

// this component allows the user to
// const AddProduct = async garment => {
// const [shirt, setShirt] = useState([]);
// const profile = JSON.parse(localStorage.getItem("profile"));
// console.log(profile.email);
// useEffect(() => {
//   async function getStoreID() {
//     let storeID = "";
//     // GET request to 'stores/domain/${match.params.domain_name}'
//     const res = await axios.get(
//       `http://localhost:5032/api/users/email/${profile.email}`
//     );
//     const userID = res.data.id;
//     const res2 = await axios.get(
//       `http://localhost:5032/api/stores/user/${userID}`
//     );
//     storeID = res2.data.id;
//     console.log(res2.data.id);
//   }
//   getStoreID();
// }, [profile.email]);

//   if (garment.mockUrl === "") {
//     alert("Please create a mockup first!");
//     return null;
//   }
//
//   await (async () => {
//     // cloudRes is the response we receive from Cloudinary after making an axios.post with the necessary
//     const cloudRes = await axios
//       .post(
//         "https://api.cloudinary.com/v1_1/dze74ofbf/upload",
//         {
//           // upload_preset - Name of an upload preset that we defined for our Cloudinary account.
//           upload_preset: "cropShrink",
//           // tags - An array (using the SDKs) or comma-separated list (for REST API calls) of tag names to assign to the uploaded asset for later group reference.
//           tags: "browser_upload",
//           // file -
//           file: garment.mockUrl
//         },
//         { "X-Requested-With": "XMLHttpRequest" }
//       )
//       .catch(err => {
//         console.log("error uploading image", err);
//       });
//
//     //
//     const merchDropRes = await axios
//       .post("https://merchdropper-production.herokuapp.com/api/products", {
//         ...product,
//         fullSizeURL: cloudRes.data.eager[0].secure_url,
//         thumbnailURL: cloudRes.data.eager[1].secure_url
//       })
//       .catch(err => {
//         console.log("error uploading image", err);
//       });
//     console.log(`${merchDropRes.data.productName} added successfully!`);
//   })();
//   return null;
// };
//
// export default AddProduct;
