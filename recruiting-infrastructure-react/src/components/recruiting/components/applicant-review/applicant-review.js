import React, { useState } from "react";
import './applicant-review.scss';
import { Modal, Grid, Row, Col } from 'react-bootstrap';
import Form from './form';
import { formData } from '../../../../shared/models/reviewView.model';

export const ApplicantReview = ({ fields }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };


    return (
      <>
          <button onClick={showModal}> Display Modal </button>
          <Modal show={isOpen} onHide={hideModal}>
              <Modal.Header>
                  Applicant Review
              </Modal.Header>
              <Modal.Body>
                  <div class="row">
                      <div class="col-md-6">
                      </div>
                      <div class="col-md-6">
                          <Form formData={formData} />
                      </div>
                  </div>
              </Modal.Body>
              <Modal.Footer>
                  <button onClick={hideModal}> Close </button>
              </Modal.Footer>
          </Modal>
      </>
    );
};
