import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  openReviewRentModal,
  setCurrentRent,
  setCurrentRentReview,
  setUpdatePage,
} from '../../store/slices/rentSlice';

import { updateRent } from '../../services/rents-service';

import { Col, Row, Divider, Rate, Button } from 'antd';
import { RiUserVoiceLine } from 'react-icons/ri';
import {
  MdOutlineRealEstateAgent,
  MdOutlineEditLocationAlt,
  MdOutlineEditCalendar,
  MdOutlineStarRate,
} from 'react-icons/md';
import { showConfirmationModal } from '../../components/ConfirmationModal';
import { modalMessage } from '../../globals/messages';
import React from 'react';
import { ReduxState } from '../../store';

function ReviewCard({ reviewObject, rentObject }) {
  const dispatch = useDispatch();
  const rates = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);
  const authenticated = useSelector((state: ReduxState) => state.auth.isAuthenticated);

  const deleteReviewHandler = async (id) => {
    showConfirmationModal(modalMessage, async function (answer) {
      if (answer) {
        let rentToUpdate = { ...rentObject };
        let tempReviews = [...rentToUpdate.reviews];
        let currentReview = tempReviews.find((review) => review.reviewer.id === currentUser.id);
        let indexOfReview = tempReviews.indexOf(currentReview);
        tempReviews.splice(indexOfReview, 1);
        rentToUpdate.reviews = tempReviews;
        await updateRent(rentToUpdate, id);
        dispatch(setUpdatePage());
      }
    });
  };

  const updateReviewHandler = (id) => {
    dispatch(setCurrentRent(rentObject));
    dispatch(setCurrentRentReview(reviewObject));
    dispatch(openReviewRentModal());
  };

  return (
    <>
      <Divider orientation="left" style={{ fontSize: 20 }}>
        <RiUserVoiceLine /> : {reviewObject.reviewer.email}
      </Divider>
      <div className="reviewCard">
        <Row>
          <Col md={24} lg={5} style={{ fontSize: 20 }} offset={1}>
            <p>
              <MdOutlineEditCalendar />: {reviewObject.monthsRented} months
            </p>
            <p>
              <MdOutlineRealEstateAgent />: {reviewObject.rentState}
            </p>
            <p>
              <MdOutlineEditLocationAlt />: {reviewObject.locationFactor}
            </p>
            <p>
              <MdOutlineStarRate />:{' '}
              <Rate tooltips={rates} disabled value={reviewObject.reviewRate} />
            </p>
          </Col>
          <Col lg={1} md={0}>
            <Divider type="vertical" style={{ height: '100%' }} />
          </Col>
          <Col md={24} lg={10}>
            <div style={{ width: '100%' }}>
              <h1 style={{ textAlign: 'center' }}>Description</h1>
              <span> {reviewObject.description}</span>
            </div>
          </Col>
          <Col lg={1} md={0}>
            <Divider type="vertical" style={{ height: '100%' }} />
          </Col>
          <Col
            md={24}
            lg={5}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {authenticated && currentUser.id === reviewObject.reviewer.id && (
              <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  type="primary"
                  shape="round"
                  style={{ width: '100%', marginBottom: '5%' }}
                  onClick={updateReviewHandler}
                >
                  UPDATE REVIEW
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  style={{ width: '100%' }}
                  onClick={() => deleteReviewHandler(rentObject.id)}
                  danger
                >
                  DELETE REVIEW
                </Button>
              </Row>
            )}
          </Col>
          <Col lg={1} md={0}></Col>
        </Row>
      </div>
    </>
  );
}

export default ReviewCard;