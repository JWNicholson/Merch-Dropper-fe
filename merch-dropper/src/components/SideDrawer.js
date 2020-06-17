import React from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { NavbarStyles } from "./Component-Styles/Navbar-styles.js";


const RootWrapper = styled.div`
  height: 70%;
  width: 60%;
  // background: #;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  //border: 1px solid black;
`;

const CloseHamburger = styled.button`
  width: 3rem;
  height: 3rem;
  background: transparent;
  margin-top: 0.75rem;
  margin-right: 0.75rem;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 3rem;
  color: #007bff;
  box-sizing: border-box;
  //border: 1px solid black;
  &:focus {
    outline: none;
  }
`;
const LinkDiv = styled.div`
  text-align: right;
  margin: 0.5rem 0;
  padding: 0.15rem;
  padding-right: 1rem;
  border-bottom: 1px solid black;
  cursor: pointer;
`;

const SideDrawer = ({
  closeDrawer,
  imgStyle,
  logoutWithRedirect,
  customLogin,
  history,
  customSignup,
  inDevelop,
}) => {

  return (
    <RootWrapper>
      <CloseHamburger onClick={closeDrawer}>X</CloseHamburger>

      {localStorage.getItem("profile") ? (
        <LinkDiv onClick={() => logoutWithRedirect()}>Log out</LinkDiv>
      ) : (
        <>
          <LinkDiv onClick={customLogin}>Login</LinkDiv>
          <LinkDiv onClick={customSignup}>SignUp</LinkDiv>
          {inDevelop ? 
            <LinkDiv onClick={closeDrawer} > 
              <Link to="/develop">Dev Auth</Link>
            </LinkDiv> 
            : null 
          }
        </>
      )}
      {/* May be relevant to a future team IF you build out user profiles and give them the ability to CRUD their profile and add a picture */}
      {/* <div className="MediaWrapper">
        {localStorage.getItem("profile") ? (
          <Media
            object
            src={JSON.parse(localStorage.profile).picture}
            style={imgStyle}
            alt="Profile Photo"
          />
        ) : (
          <Media
            object
            src="https://cdn4.iconfinder.com/data/icons/messenger-1-0-line/106/Profile_Line-512.png"
            style={imgStyle}
            alt="Guest Profile Photo"
          />
        )}
        {localStorage.getItem("profile") ? (
          <NavbarText style={{ paddingLeft: "1rem" }}>
            {JSON.parse(localStorage.profile).name}
          </NavbarText>
        ) : (
          <p style={{ paddingLeft: "1rem" }}>Guest</p>
        )}
      </div> */}
    </RootWrapper>
  );
};

export default withRouter(SideDrawer);
