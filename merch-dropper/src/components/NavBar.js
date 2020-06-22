import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
// components
import CartIcon from "./Cart/CartIcon.js";
import CartDropDown from "./Cart/CartDropDown";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu'; // menu needs the state in the nav until a smarter dev comes along that can effectively modularize(is that a word? 🤔) this.
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu'; // Icon could likely be broken down more modularly
// styles
import { useStyles } from "./Component-Styles/NavBar.js";
// auth0 client
import { useAuth0 } from "./Auth/Auth";
// logo
import logo from "../assets/merchdropper-logo.png";
import { resetCart } from "../store/actions";

const NavBar = ({ hidden, history, location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loginWithRedirect, logout } = useAuth0();
  const { pathname } = location;
  const domain_name = localStorage.getItem("domain_name");
  const [store_name, setStore_name] = useState();
  const [domainURL, setDomainURL] = useState();
  const [anchorEl, setAnchorEl] = useState(null); // new mobile menu
  const [inDevelop, setInDevelop] = useState(false);

  const logoutWithRedirect = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("store_name");
    localStorage.removeItem("storeID");
    localStorage.removeItem("fromSettings");
    logout({
      returnTo: window.location.origin,
    });
  };
  if (localStorage.getItem("profile")) {
    
    const userID = JSON.parse(localStorage.getItem("profile")).id;
    axiosWithAuth()
      .get(`/api/stores/user/${userID}`)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("store_name", res.data.store_name);
          setStore_name(localStorage.getItem("store_name"));
          setDomainURL(res.data.domain_name)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    
    if (process.env.REACT_APP_BASE_URL === "development") {
      setInDevelop(true);
    }
  }, []);
  // force closes cart dropdown if nav isn't a storefront
  useEffect(() => {
    if (pathname !== domain_name) {
      dispatch(resetCart());
    }
  }, [pathname]);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Nav = () => {
    if (!!localStorage.getItem("profile")) {
      return (
        <nav className={classes.ButtonWrapper}>
          {window.location.pathname === `/${store_name}` ? (
            <>
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
              <CartIcon />
            </>
          ) : (
            <>
              {store_name ? (
                <Link to={`/${domainURL}`} className={classes.links}>
                  Your Store
                </Link>
              ) : null}{" "}
              <span
                className={classes.links}
                onClick={logoutWithRedirect}
                style={{ marginLeft: "32px" }}
              >
                Logout
              </span>
            </>
          )}
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
      <div className={classes.MobileWrapper}>
        <div className={classes.BrandWrapper} onClick={homepageRedirect}>
          <img
            className={classes.BrandLogo}
            src={logo}
            alt="merch-dropper logo"
            onClick={homepageRedirect}
          />
        </div>
        <div className={classes.CartAndHamWrapper}>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
             <MenuIcon fontSize="large" />
          </Button>
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
              {localStorage.getItem("profile") ?
              <span>
                <MenuItem onClick={logoutWithRedirect}>Logout</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> // if CRUD profiles added */}
                <MenuItem onClick={handleClose}>Close</MenuItem>
              </span>
              :
              <span>
              <MenuItem onClick={customLogin}>Login</MenuItem>
              <MenuItem onClick={customSignup}>SignUp</MenuItem>
              {inDevelop ? 
                <MenuItem onClick={handleClose}>
                  <Link to="/develop">Dev Auth</Link>
                </MenuItem>
                : null
              }
              <MenuItem onClick={handleClose}>Close</MenuItem>
              </span>
              }
            </Menu>
        </div>
        {hidden ? null : <CartDropDown />}
      </div>

      <div className={classes.DesktopWrapper}>
        <div className={classes.BrandWrapper} onClick={homepageRedirect}>
          <img
            className={classes.BrandLogo}
            src={logo}
            alt="merch-dropper logo"
          />
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
