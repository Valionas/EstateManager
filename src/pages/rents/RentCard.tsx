import { useSelector, useDispatch } from 'react-redux';
import {
  openRequestRentModal,
  openReviewRentModal,
  openRentModal,
  setCurrentRent,
  setUpdatePage,
} from '../../store/slices/rentSlice';

import { Col, Row, Image, Divider } from 'antd';
import { Space, Table, Tag, Button } from 'antd';
import { showConfirmationModal } from '../../components/ConfirmationModal';
import { modalMessage } from '../../globals/messages';

import { GoLocation } from 'react-icons/go';
import './Rents.css';

import RequestRentModal from './modals/RequestRentModal';
import ReviewRentModal from './modals/ReviewRentModal';
import AddEditRentModal from './modals/AddEditRentModal';
import ReviewCard from './ReviewCard';

import { deleteRent, updateRent } from '../../services/rents-service';
import React from 'react';
import { ReduxState } from '../../store';
import { auth } from '../../firebase';

function RentCard({ rentObject }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);
  const authenticated = useSelector((state: ReduxState) => state.auth.isAuthenticated);

  const openRequestRentModalHandler = () => {
    dispatch(setCurrentRent(rentObject));
    dispatch(openRequestRentModal());
  };

  const openReviewRentModalHandler = () => {
    dispatch(setCurrentRent(rentObject));
    dispatch(openReviewRentModal());
  };

  const deleteRentHandler = async (id) => {
    showConfirmationModal(modalMessage, async function (answer) {
      if (answer) {
        await deleteRent(id);
        dispatch(setUpdatePage());
      }
    });
  };

  const updateRentHandler = (id) => {
    dispatch(setCurrentRent(rentObject));
    dispatch(openRentModal());
  };

  const renewRentHandler = async (rentObject) => {
    let currentRentObject = rentObject;
    currentRentObject.status = 'Rentable';
    await updateRent(currentRentObject, currentRentObject.id);
    dispatch(setUpdatePage());
  };

  return (
    <>
      <div className="rentCard">
        <Row>
          <Col
            md={24}
            lg={6}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Image height={'100%'} width={'100%'} src={rentObject.image} />
          </Col>
          <Col md={24} lg={10} offset={1}>
            <h1>{rentObject.name}</h1>
            <p>
              <GoLocation /> {rentObject.location}
            </p>
            <h1>Description</h1>
            <p>{rentObject.description}</p>
          </Col>
          <Col md={24} lg={5} offset={1}>
            <Row>
              <p style={{ fontSize: '2vh' }}>
                <b>Status:</b>{' '}
                <span
                  className={
                    rentObject.status === 'Occupied' ? 'approvedRentBanner' : 'rentableRentBanner'
                  }
                >
                  {rentObject.status}
                </span>
              </p>
            </Row>
            <Row>
              <p style={{ fontSize: '2vh' }}>
                <b>Price:</b> ${rentObject.rent}/monthly
              </p>
            </Row>
            <Row>
              <p style={{ fontSize: '2vh' }}>
                <b>Minimal rental time:</b> {rentObject.minimalRentalTime} months
              </p>
            </Row>
            {authenticated && currentUser.email !== rentObject.owner && (
              <Row>
                {rentObject.status !== 'Occupied' &&
                  rentObject.applicants.find((applicant) => applicant === currentUser.email) ===
                    undefined && (
                    <Button
                      type="primary"
                      shape="round"
                      style={{ width: '100%', marginBottom: '5%' }}
                      onClick={openRequestRentModalHandler}
                    >
                      REQUEST RENT
                    </Button>
                  )}
                {rentObject.reviews.find((review) => review.reviewer.id === currentUser.id) ===
                  undefined && (
                  <Button
                    type="primary"
                    shape="round"
                    style={{ width: '100%' }}
                    onClick={openReviewRentModalHandler}
                  >
                    REVIEW
                  </Button>
                )}
              </Row>
            )}
            {authenticated && currentUser.email === rentObject.owner && (
              <Row>
                {rentObject.status === 'Occupied' && (
                  <Button
                    type="primary"
                    shape="round"
                    style={{ width: '100%', marginBottom: '5%' }}
                    onClick={() => renewRentHandler(rentObject)}
                  >
                    RENEW RENT
                  </Button>
                )}
                <Button
                  type="primary"
                  shape="round"
                  style={{ width: '100%', marginBottom: '5%' }}
                  onClick={updateRentHandler}
                >
                  UPDATE RENT
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  style={{ width: '100%' }}
                  onClick={() => deleteRentHandler(rentObject.id)}
                  danger
                >
                  DELETE RENT
                </Button>
              </Row>
            )}
          </Col>
        </Row>
        <Divider />
        {rentObject.reviews && rentObject.reviews.length !== 0 && (
          <>
            <Row justify="center">
              <h1>
                <b>REVIEWS</b>
              </h1>
            </Row>
            <Row>
              {rentObject.reviews.map((review) => (
                <Col md={24} lg={24}>
                  <ReviewCard reviewObject={review} rentObject={rentObject}></ReviewCard>
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
      <RequestRentModal />
      <ReviewRentModal />
    </>
  );
}

export default RentCard;