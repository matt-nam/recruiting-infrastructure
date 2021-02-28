import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { Field } from 'redux-form';
import './applicant-review.scss';
import ApplicantTable from '../applicant-table'

export const ApplicantReview = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
        setIsOpen(true);
    }

    const hideModal = () => {
        setIsOpen(false);
    }

    return (
      <>
          <button onClick={showModal}> Display Modal </button>
          <Modal show={isOpen} onHide={hideModal}>
              <Modal.Header>
                  Applicant Review
              </Modal.Header>
              <Modal.Body>
                  Text
              </Modal.Body>
              <Modal.Footer>
                  <button onClick={hideModal}> Close </button>
              </Modal.Footer>
          </Modal>
      </>
    )
};
