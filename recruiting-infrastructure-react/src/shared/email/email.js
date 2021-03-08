import React, { useState } from "react";
import "./email.scss";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { fetchEmail, editEmail, sendEmail } from "services/email";
import { getEmail } from "services/email/selectors";

export const Email = (props) => {
    const dispatch = useDispatch();
    const { closed, setClosed } = props
    const [show, setShow] = useState(false);
    var email = getEmail();
    console.log(email);

    // fetch email
    const handleShow = () => 
    {
      dispatch(fetchEmail);
      setShow(true);
    }

    // send email
    const handleClose = () => 
    {
      dispatch(sendEmail);
      setShow(false);
    }
    
    return (
    <>
      <Button onClick={handleShow}>
        Email applicant
      </Button>

    <div className="modal-container">
      <Modal show={show} onHide={handleClose} bsSize="large">
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
            <textarea className="email-container" name="email-entry" rows="4" cols="50"
              onChange={e => dispatch(editEmail(e.target.value))}>
                {email}
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