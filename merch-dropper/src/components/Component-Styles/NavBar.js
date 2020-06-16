import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    DesktopWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 118,
        background: "white",
        width: "100%",
        padding: "0 162px 0 87px",
       
      [theme.breakpoints.down('md')]:{
          display: "none"
      }
    },

    MobileWrapper: {        
        display: "none",        
        
        [theme.breakpoints.down('md')]:{
            display: "flex",
            justifyContent: "space-between",
            padding: "0.75rem",
            background:"white",
            maxWidth: "100%",
        }        
    },
    BrandWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 75,
        },

    BrandLogo: {
        cursor: "pointer",
        width: 49,
        height: 58, 
    },

    BrandTitle: {
        color: "#1c1c2e",
        fontWeight: 700,
        margin: 0,
        fontSize: "2.5rem",
        fontFamily: 'Lato, sans-serif', 
        marginLeft: 24,
            
        [theme.breakpoints.down('sm')]:{
            fontSize: "2rem",
            alignItems: "center",
        }
    },

    ButtonWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },

    CartAndHamWrapper: {
        width: "8rem",
        display: "flex",
        justifyContent: "space-between",
    },

    Hamburger: {
        width: "3rem",
        height:" 3rem",
        margin: "auto 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        "&:focus": {
            outline: "none",
    }
},
    HamburgerLines: {
        width: "3rem",
        height: 4,
        borderRadius: 2,
        background: "#037bff",
    },

    links: {
        fontFamily: "Lato, sans-serif",
        fontSize: 18,
        lineHeight: 22,
        color: "#1c1c2e",
        cursor: "pointer",
        "&:first-child": {
            marginRight: 32,
        },

        "&:hover": {
            textDecoration: "none",
            color: "#4455ee",
            fontWeight: 700,            
        },
    },

    links2:  {
        fontFamily: "Lato, sans-serif",
        fontSize: 18,
        lineHeight: 22,
        border: 0,
        borderRadius: 8,
        color: "royalblue",
        background: "none",
        fontWeight: "bold",        
    },


// https://www.merchdropper.store, https://merchdropper.store,

// https://www.merchdropper.store/dashboard, https://merchdropper.store/dashboard, https://www.merchdropper.store/stripe-setup, https://merchdropper.store/stripe-setup, https://www.merchdropper.store/redirect, https://merchdropper.store/redirect

}))