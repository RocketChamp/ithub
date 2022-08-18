import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const PromptSignin = ({show, handleClose}) => {
  
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Join IT-Hub</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          In order to create or like posts you have to create an account or sign in if you already have one!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ithub" style={{backgroundColor:"grey"}} onClick={handleClose}>
            No, thanks
          </Button>
          <Link to='/auth'>
          <Button variant="darktheme">Sign In</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PromptSignin;
