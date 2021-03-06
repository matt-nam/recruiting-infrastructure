import React, { useState } from "react";
import './applicant-review.scss';
import { Modal } from 'react-bootstrap';

import ReviewView from './components/review-view';
import ApplicationView from './components/application-view'

import { formData } from 'shared/models/reviewView.model';
import mockData from 'shared/models/tests/mockApplications';
import { getShowingModal, getCurrentApplication } from 'services/applications/selectors'
import { useDispatch, useSelector } from "react-redux";

import { setApplicationsSortOptions, setCurrentApplication, setShowingModal } from 'services/applications/actions';

export const ApplicantReview = () => {

    const dispatch = useDispatch()
    const isOpen = useSelector(state => getShowingModal(state))
    const currentApplication = useSelector(state => getCurrentApplication(state))

    const hideModal = () => {
        dispatch(setShowingModal({ showingModal: false }))
    };

    return (
        <>
            {/* <button onClick={showModal}> Review Applicant </button> */}
            <Modal size="lg" show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    Applicant Review
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <ApplicationView currentApplication={currentApplication}/>
                        </div>
                        <div className="col-md-6">
                            <ReviewView formData={mockData, formData} />
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
