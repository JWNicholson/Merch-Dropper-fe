import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({


    jumboParent:{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
       
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column",
            alignItems: "center",            
        }
    },
    column: {      
        padding: 50,        
        textAlign: "center",    
    },
    text:{
        paddingTop: 75,
        color: "rgba(0,0,0,.87)",
        fontSize: "2rem",
    
         [theme.breakpoints.down('md')]: {
             padding: 0
         }
    },
    image: {
        height: "40vh",
        [theme.breakpoints.down('md')]: {
            height: "60vh"
        },
        [theme.breakpoints.down('sm')]: {
            maxHeight: 300
        },
    },
    row: {
        width: "70%",
        [theme.breakpoints.down('md')]:{
            display: "block"
        }
    },
}));

