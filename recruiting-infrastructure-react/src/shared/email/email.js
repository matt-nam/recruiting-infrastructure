import React, { useState } from "react";
import "./email.scss";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { fetchEmail, editEmail, sendEmail } from "services/email";
import { getEmail } from "services/email/selectors";

export const Email = (props) => {
    const dispatch = useDispatch();
    const { applicantId } = props // pass in applicnat ID?
    const [show, setShow] = useState(false);

    // fetch email
    var email = getEmail(); // issue with get email and fetching email (fetch email has to happen during handleShow, but if we getEmail before then, defaultValue in textarea seems to be null)
    // also store doesn't work properly, could be related
    console.log(email);

    const handleShow = () => 
    {
      dispatch(fetchEmail("interviewTemplate"));
      setShow(true);
    }

    // send email
    const handleSubmit = () => 
    {
      const email = document.getElementById("email-text");
      dispatch(sendEmail(email, applicantId)); 
      setShow(false);
    }

    const handleClose = () => 
    {
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
              id="email-text" defaultValue={email}>
            </textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit} className="send-button">
            send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
    )
}