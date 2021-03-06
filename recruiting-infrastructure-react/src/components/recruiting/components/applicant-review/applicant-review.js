import React, { useState } from "react";
import './applicant-review.scss';
import { Modal } from 'react-bootstrap';
import Form from './form-components/form';
import { formData } from '../../../../shared/models/reviewView.model';
import mockData from 'shared/models/tests/mockApplications';

export const ApplicantReview = ({ props }) => {
    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    return (
      <>
          <button onClick={showModal}> Review Applicant </button>
          <Modal show={isOpen} onHide={hideModal}>
              <Modal.Header>
                  Applicant Review
              </Modal.Header>
              <Modal.Body>
                  <div class="row">
                      <div class="col-md-6">
                      </div>
                      <div class="col-md-6">
                          <Form formData={mockData, formData} />
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
