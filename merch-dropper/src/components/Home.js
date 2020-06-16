import React from "react";
import FAQ from "./FAQ"
import {useStyles} from "../components/Component-Styles/Home";
import { useAuth0 } from "./Auth/Auth";


import {
  Button,
  Row,
  Col,  
  Media
} from "reactstrap";


const Home = ({ history }) => {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();
  let url;
  if (process.env.REACT_APP_BASE_URL === "development") {
    url = "http://localhost:3000/redirect";
  } else {
    url = "https://merchdropper.store/redirect";
  }
  const customSignup = () => {
    loginWithRedirect({
      redirect_uri: url,
      signup: true,
    });
  }

  return (
    <div className={classes.jumboParent} >
      <Row className={classes.row}>
        <Col className={classes.column}> 
          <Media className={classes.image} object src="https://res.cloudinary.com/dze74ofbf/image/upload/v1591910999/couple_z0vlls.jpg"/>
        </Col>
        <Col className={classes.column} >               
          <h1 className={classes.text } style={{fontSize: "2.8rem"}}  >Hassle free online store</h1>                
          <h2 style={{ fontSize: "1.5rem"}}>You handle the designs, we'll handle the rest.</h2>
          <p style={{ textAlign: "center" }}>
            <Button style={{background: "#4455ee", fontSize: 18, fontWeight: "bold", marginTop: 50}} className="letsGo"
              onClick={customSignup}
            >
              Create Store
            </Button>
          </p>
        </Col>
      </Row>          
      <FAQ/>     
    </div>
  );
};

export default Home;