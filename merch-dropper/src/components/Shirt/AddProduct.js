import axios from "axios";
import { axiosWithEnv } from "../../utils/axiosWithEnv";



// this function allows the user to design a product
const addProduct = async (history, garment, product, design) => {
  console.log({ design });
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
      console.log('product to our be', product)
    //
    const merchDropRes = await axiosWithEnv()
      .post("/api/products", {
        ...product,
        fullSizeURL: cloudRes.data.eager[0].secure_url,
        thumbnailURL: cloudRes.data.eager[1].secure_url,
      })
      .then(history.push("/dashboard"),
      garment.mockUrl = "")
      .catch(err => {
        console.log("MERCHDROPRES", err);
      });
    console.log(` added successfully!`);
  })();
  // garment.mockUrl = "";
};

export default addProduct;