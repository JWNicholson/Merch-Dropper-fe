import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    height: "auto",
    margin: 50 
    
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
  },
  panel: {
    borderBottom: "1px solid F3F3F3"
  },
  

}));

const FAQ = () =>{
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <h2 style={{textAlign: "center", marginBottom: 50, fontSize: "1.6rem"}}>Frequently Asked Questions</h2>
        <ExpansionPanel className={classes.expansion}>
      <ExpansionPanelSummary
        className={classes.panel}
          expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>What is Merch Dropper?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          It's the fastest way to set up a hassle free online storefront with your own designs! Upload designs and create products to create a drop-shipping online shop. Your store is yours, build your brand, raise money, and more.          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.expansion}>
      <ExpansionPanelSummary
        className={classes.panel}
          expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>What is Stripe?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          Stripe is a software that allows stores to accept payments online.  There is a 2.9% + $0.30 fee from stripe for each transaction.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.expansion}>
        <ExpansionPanelSummary
        className={classes.panel}
          expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>How do I add products to my store?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            From your dashboard, you will click on "Add Product".  From there you will upload the design that you would like to have on your merchandise, and select a color.  Then click on preview design.  If you are satisfied, click on Save & Continue.  This will take you to a page where you can name your item, give it a price, and set a description.  It is as easy at that.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel >
      <ExpansionPanel className={classes.expansion}>
      <ExpansionPanelSummary
      className={classes.panel}
          expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>How do I share my store with others?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          When you create a store you are given a personalized domain name (merchdropper.store/your_store) that will be the storefront for your designed products. Share your new url address with friends, family, and followers! Copy and paste, text and even email at your heart's content; we don't judge.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.expansion}>
      <ExpansionPanelSummary
      className={classes.panel}
          expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>When a buyer buys one of my products, how will my order be fulfilled?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            MerchDropper works with a drop shipment company.  When the buyer places their order, the order gets sent to scalable press.  Then scalable press will print the merchandise as ordered and will also ship to the buyer.  Leaving it hands-free for you.  
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel >
      <ExpansionPanelSummary
      className={classes.panel}
          expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>How is my profit per item calculated?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          Merch Dropper handles every aspect of supply including fees, taxes and shipping. We strictly calculate the cost to cover the expenses of a given order, leaving all of the profits to you. Merch Dropper doesn't keep a dime.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      
    </div>
  )
}

  export default FAQ;