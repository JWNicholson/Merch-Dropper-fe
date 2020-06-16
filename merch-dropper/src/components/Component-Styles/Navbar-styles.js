import {
    createGlobalStyle
} from "styled-components";

export const NavbarStyles = createGlobalStyle `


    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .DesktopWrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 118px;
        background: white;
        width: 100%;
        padding: 0 162px 0 87px;
       
      
        @media (max-width: 980px) {
        //   display: flex;
        //   flex-direction: column;
          display: none;
        }
    } 

    .MobileWrapper {
        display: none;

        @media (max-width: 980px) {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem;
            background: white;
            max-width: 80%;
            
        }
    }

    .BrandWrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 49px;

        @media (max-width: 411px) {
            width: 49%;
            justify-content: space-between;
        }
    }

    .BrandLogo {
        cursor: pointer;
        width: 49px;
        height: 58px; 
    }

    .BrandTitle {
        color: #1c1c2e;
        font-weight: 700;
        font-size: 30px;
        font-family: 'Lato', sans-serif;
        cursor: pointer;
        margin-left: 24px;
        line-height: 36px;


        @media (max-width: 411px) {
            font-size: 1.25rem;
        }
    }

    .ButtonWrapper {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .CartAndHamWrapper {
        width: 8rem;
        display: flex;
        justify-content: space-between;

    }

    .Hamburger {
        width: 3rem;
        height: 3rem;
        margin: auto 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        box-sizing: border-box;

            &:focus {
                outline: none;
            }
    }

    .HamburgerLines {
        width: 3rem;
        height: 4px;
        border-radius: 2px;
        background: #037bff;
    }

    .links {
        font-family: "Lato", sans-serif;
        font-size: 18px;
        line-height: 22px;
        color: #1c1c2e;
        cursor: pointer;
       

        &:first-child {
            margin-right: 32px;
        }

        &:hover {
            text-decoration: none;
            color: #4455ee;
            font-weight: 700;
            
        }
    }

    .links.cta {
        // width: 160px;
        // height: 48px;
        border: 0;
        border-radius: 8px;
        color: royalblue;
        background: none;
        font-weight: bold

        
    }

    .MediaWrapper {
        display: flex;
        align-items: center;
        
        @media (max-width: 768px) {
          padding: 0.1rem 1rem;
          border-bottom: 1px solid black;
        }
    }
`;

// https://www.merchdropper.store, https://merchdropper.store,

// https://www.merchdropper.store/dashboard, https://merchdropper.store/dashboard, https://www.merchdropper.store/stripe-setup, https://merchdropper.store/stripe-setup, https://www.merchdropper.store/redirect, https://merchdropper.store/redirect