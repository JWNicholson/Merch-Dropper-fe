import axios from "axios";
import scalableData from "./scalableData";
import { axiosWithEnv } from "../../utils/axiosWithEnv";
import parseUrl from "./parseURL"


const HandleScalableMockup = async (garment, setGarment, design, setDesign, product, setProduct) => {
   
  async function makeShirt() {
    try {      
      // this code calls the scalableData component to create a garment object to be sent to Scalable Press as "data" in the axios.post call below
      const data = await scalableData(garment);
           
      // shirtImage saves/posts the shirt preview to the back end
      const shirtImage = await axiosWithEnv().post(
        "/api/products/mockup",
        data,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const response = shirtImage;
     
     console.log('what is getting parsed',parseUrl(response.data.URL))
      console.log('shirtImage', response)
      // setGarment spreads in the existing garment state object and sets the URL of the mock up image (shirtImage) to mockURL, a property
      setGarment({ ...garment, mockUrl: response.data.URL });
      setDesign({...design, designId: parseUrl(response.data.URL).designId[0]});
      
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  }

  // this code executes the async function above
  makeShirt();

  return null;
};

export default HandleScalableMockup;
