import React from "react";
import './applicant-review.scss';
import { Modal } from 'react-bootstrap';

import ReviewView from './components/review-view';
import ApplicationView from './components/application-view'

import { getShowingModal, getCurrentApplication } from 'services/applications/selectors'
import { useDispatch, useSelector } from "react-redux";
import { formData } from './form-views/review-view-model';

import { setShowingModal } from 'services/applications/actions';

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
                    Applicant Review <button onClick={hideModal}> Close </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <ApplicationView currentApplication={currentApplication}/>
                        </div>
                        <div className="col-md-6">
                            <ReviewView currentApplication={currentApplication} formData={formData}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
