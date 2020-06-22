import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { connect, useSelector } from 'react-redux';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const QuoteError = ({ error }) => {
  const classes = useStyles();
  const history = useHistory();
  const thisStore = localStorage.getItem('domain_name')
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  useEffect(()=> {
    if(error){
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [error])
// can be broken out to it's own component and imported if need be
  const readError = error => {
    let errorMessage;
    if(error === "orderToken is null"){
      errorMessage = "There was a problem processing the order. Likely there was an issue with your shipping address, please try again. If the problem persists, contact the Merch Dropper development team"
    } else {
      errorMessage = "Unknown error, please try again. If the problem persists, contact the Merch Dropper development team"
    }
    return(
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">OOF! 😬</h2>
          <p id="simple-modal-description">
            {errorMessage}
          </p>
          <Button onClick={()=> history.push(`/${thisStore}/shippingAddress`)}>Try Again</Button>
          <Button onClick={()=> history.push(`/${thisStore}`)}>Back to Store</Button>
        </div>
      );
  } 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = readError(error)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state)
  return({
    error: state.QuoteReducer.error
  }
  )
}

export default connect(mapStateToProps, {})(QuoteError);