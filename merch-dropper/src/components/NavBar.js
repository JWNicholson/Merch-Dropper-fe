import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";
// components
import SideDrawer from "./SideDrawer";
import CartIcon from "./Cart/CartIcon.js";
import CartDropDown from "./Cart/CartDropDown";
// styles
// import { NavbarStyles } from "./Component-Styles/Navbar-styles.js";
import {useStyles} from "./Component-Styles/NavBar.js"
// auth0 client
import { useAuth0 } from "./Auth/Auth";
// logo
import logo from "../assets/merchdropper-logo.png";
import { resetCart } from "../store/actions";

const NavBar = ({ hidden, history, location }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { loginWithRedirect, logout } = useAuth0();
  const { pathname } = location;
  const domain_name = localStorage.getItem("domain_name");

  const store_name = localStorage.getItem("store_name");

  const [state, setState] = useState({ sideDrawerOpen: false });
  const [inDevelop, setInDevelop] = useState(false);

  const logoutWithRedirect = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("store_name");
    localStorage.removeItem("storeID");
    logout({
      returnTo: window.location.origin,
    });
  };

  useEffect(() => {
    if (process.env.REACT_APP_BASE_URL === "development") {
      setInDevelop(true);
    }
  }, []);
  // force closes cart dropdown if nav isn't a storefront
  useEffect(()=>{
    if(pathname !== domain_name){
      dispatch(resetCart())
    }
  },[pathname])


  let url = "";

  if (process.env.REACT_APP_BASE_URL === "development") {
    url = "http://localhost:3000/redirect";
  } else {
    url = "https://merchdropper.store/redirect";
  }

  const customLogin = () => {
    loginWithRedirect({
      redirect_uri: url,
    });
  };

  const customSignup = () => {
    loginWithRedirect({
      redirect_uri: url,
      signup: true,
    });
  };

  const homepageRedirect = () => {
    history.push("/");
  };

  let drawerToggleClickHandler = () => {
    setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  let closeBackDropClickHandler = () => {
    setState({ sideDrawerOpen: false });
  };

  let sideDrawer;
  const imgStyle = {
    maxHeight: 45,
    maxWidth: 45,
    borderRadius: 10,
  };

  if (state.sideDrawerOpen) {
    sideDrawer = (
      <SideDrawer
        closeDrawer={closeBackDropClickHandler}
        imgStyle={imgStyle}
        logoutWithRedirect={logoutWithRedirect}
        customLogin={customLogin}
      />
    );
  }

  const Nav = () => {
    if (!!localStorage.getItem("profile")) {
      return (
        <nav className={classes.ButtonWrapper}>
          {store_name ? (
            <Link to={`/${store_name}`} className="links">
              Your Store
            </Link>
          ) : null}

          <Link
            to="/dashboard"
            className={classes.links}
            style={
              pathname === "/dashboard"
                ? { fontWeight: 700 }
                : { fontWeight: 500 }
            }
          >
            Dashboard
          </Link>
          <span
            className={classes.links}
            onClick={logoutWithRedirect}
            style={{ marginLeft: "32px" }}
          >
            Logout
          </span>
        </nav>
      );
    } else if (domain_name === pathname.substr(1).split("/")[0]) {
      return (
        <nav className={classes.ButtonWrapper}>
          <Link to={`/${domain_name}`} className="links">
            {domain_name}
          </Link>
          <CartIcon />          
        </nav>
      );
    } else {
      return (
        <nav className={classes.ButtonWrapper}>
          {inDevelop ? (
            <>
              <Link className={classes.links} to="/develop">
                Dev Auth
              </Link>
              <button
                className={classes.links2}
                onClick={() => {
                  setInDevelop(false);
                }}
              >
                Prod Nav
              </button>
            </>
          ) : (
            <div className={classes.ButtonWrapper}>
              <span className={classes.links} onClick={customLogin}>
                Login
              </span>
              <button className={classes.links2} onClick={customSignup}>
                SignUp
              </button>
            </div>
          )}
        </nav>
      );
    }
  };

  return (
    <div
      style={
        pathname === "/stripe-setup" || pathname === "/createstore"
          ? { display: "none" }
          : { display: "block" }
      }
    >
      {/* <NavbarStyles /> */}
      <div className={classes.MobileWrapper} >
        {sideDrawer}
        <div className={classes.BrandWrapper} onClick={homepageRedirect}>
          <img
            className={classes.BrandLogo}
            src={logo}
            alt="merch-dropper logo"
            onClick={homepageRedirect}
          />

          <h2 className={classes.BrandTitle}>Merch Dropper</h2>
        </div>
        <div className={classes.CartAndHamWrapper}>
        

          <button className={classes.Hamburger} onClick={drawerToggleClickHandler}>
            <div className={classes.HamburgerLines}></div>
            <div className={classes.HamburgerLines}></div>
            <div className={classes.HamburgerLines}></div>
            
          </button>
        </div>
        {hidden ? null : <CartDropDown />}
      </div>

      <div className={classes.DesktopWrapper}>
        <div className={classes.BrandWrapper} onClick={homepageRedirect}>
          <img className={classes.BrandLogo} src={logo} alt="merch-dropper logo" />
          <h2 className={classes.BrandTitle}>Merch Dropper</h2>
        </div>

        <Nav />
        {hidden ? null : <CartDropDown />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  hidden: state.CartReducer.hidden,
});

export default withRouter(connect(mapStateToProps, resetCart)(NavBar));
