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

import { ReduxState } from '../../store';
import { useTranslation } from 'react-i18next';

function ReviewCard({ reviewObject, rentObject }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rates = [
    t('rent_review_star_1'),
    t('rent_review_star_2'),
    t('rent_review_star_3'),
    t('rent_review_star_4'),
    t('rent_review_star_5'),
  ];
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);
  const authenticated = useSelector((state: ReduxState) => state.auth.isAuthenticated);

  const deleteReviewHandler = async (id) => {
    showConfirmationModal(t('confirmation_text'), async function (answer) {
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

  const renderTranslatedRentState = (rentState) => {
    switch (rentState) {
      case 'Poor':
        return t('rent_state_poor');
      case 'Neutral':
        return t('rent_state_neutral');
      case 'Good':
        return t('rent_state_good');
      case 'Very Good':
        return t('rent_state_very_good');
      case 'Excellent':
        return t('rent_state_excellent');
      default:
        break;
    }
  };

  const renderTranslatedRentLocationFactor = (location) => {
    switch (location) {
      case 'Desolate':
        return t('rent_location_desolate');
      case 'Neutral':
        return t('rent_location_neutral');
      case 'Lively':
        return t('rent_location_lively');
      case 'Very Busy':
        return t('rent_location_very_busy');
      default:
        break;
    }
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
              <MdOutlineEditCalendar />: {reviewObject.monthsRented} <span>{t('months')}</span>
            </p>
            <p>
              <MdOutlineRealEstateAgent />: {renderTranslatedRentState(reviewObject.rentState)}
            </p>
            <p>
              <MdOutlineEditLocationAlt />:{' '}
              {renderTranslatedRentLocationFactor(reviewObject.locationFactor)}
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
              <h1 style={{ textAlign: 'center' }}>{t('rent_description')}</h1>
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
                  {t('update_review')}
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  style={{ width: '100%' }}
                  onClick={() => deleteReviewHandler(rentObject.id)}
                  danger
                >
                  {t('delete_review')}
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
