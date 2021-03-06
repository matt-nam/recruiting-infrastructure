import React, { useState } from "react";
import "./email.scss";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const Email = (props) => {
    const { closed, setClosed } = props
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
    <>
      <Button onClick={handleShow}>
        Launch demo modal
      </Button>

    <div className="modal-container">
      <Modal show={show} onHide={handleClose} bsSize="large">
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
            <textarea className="email-container" name="email-entry" rows="4" cols="50">
                this is the email. :0
            </textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} className="send-button">
            send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
    )
}