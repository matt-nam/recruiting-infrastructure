import React, { useState } from "react";
import './applicant-review.scss';

import { Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

    const [wereChanges, setWereChanges] = useState(false)

    const hideModal = () => {
        if (wereChanges) {
            confirmAlert({
                title: 'Confirm to close',
                message: 'There are unsubmitted changes.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => dispatch(setShowingModal({ showingModal: false }))
                    },
                    {
                        label: 'No',
                        onClick: () => {}
                    }
                ]
            });
        } else {
            dispatch(setShowingModal({ showingModal: false }))
        }
    };

    return (
        <>
            {/* <button onClick={showModal}> Review Applicant </button> */}
            <Modal size="lg" show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    Applicant Review<div onClick={hideModal} className="regular-button">Close</div>
                </Modal.Header>
                <Modal.Body>
                    <ApplicationView currentApplication={currentApplication} />
                    <ReviewView currentApplication={currentApplication} formData={formData} setWereChanges={setWereChanges} />
                </Modal.Body>
            </Modal>
        </>
    );
};
