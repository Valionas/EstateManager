import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentEstate,
  openEstateModal,
  setUpdatePage,
  openApplyForEstateModal,
} from '../../store/slices/estateSlice';

import { Col, Row, Image, Divider, Button, Carousel, Badge, Descriptions } from 'antd';
import { showConfirmationModal } from '../../components/ConfirmationModal';

import ApplyForEstateModal from './modals/ApplyForEstateModal';

import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';
import './Estates.css';

import { deleteEstate } from '../../services/estates-service';
import { ReduxState } from '../../store';
import { useTranslation } from 'react-i18next';

function EstateCard({ estateObject }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);
  const authenticated = useSelector((state: ReduxState) => state.auth.isAuthenticated);

  const deleteEstateHandler = async (id) => {
    showConfirmationModal(t('confirmation_text'), async function (answer) {
      if (answer) {
        await deleteEstate(id);
        dispatch(setUpdatePage());
      }
    });
  };

  const updateEstateHandler = (id) => {
    dispatch(setCurrentEstate(estateObject));
    dispatch(openEstateModal());
  };

  const openEstateApplicationModalHandler = () => {
    dispatch(setCurrentEstate(estateObject));
    dispatch(openApplyForEstateModal());
  };

  const renderTranslatedEstateStatus = (status) => {
    if (status === 'For Sale') {
      return t('estate_status_for_sale');
    } else {
      return t('estate_status_sold');
    }
  };
  return (
    <>
      <div className="estateCard">
        <Row>
          <Col span={24}>
            <Carousel
              effect="fade"
              className="carouselCard"
              arrows={true}
              prevArrow={<AiOutlineLeftCircle />}
              nextArrow={<AiOutlineRightCircle />}
            >
              {estateObject?.images.map((image) => (
                <div
                  style={{
                    height: '100px',
                    color: '#fff',
                    lineHeight: '160px',
                    textAlign: 'center',
                    background: '#364d79',
                  }}
                >
                  <Image height={'45vh'} width={'100%'} src={image} />
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row justify="center" style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
          <h1>
            <b>{estateObject.name}</b>
          </h1>
        </Row>
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label={t('estate_starting_price')} labelStyle={{ fontWeight: 900 }}>
            <span style={{ fontWeight: 500 }}>{estateObject.startingPrice} BGN</span>
          </Descriptions.Item>
          <Descriptions.Item label={t('estate_year')} labelStyle={{ fontWeight: 900 }}>
            <span style={{ fontWeight: 500 }}>{estateObject.year}</span>
          </Descriptions.Item>
          <Descriptions.Item label={t('estate_bid_step')} labelStyle={{ fontWeight: 900 }}>
            <span style={{ fontWeight: 500 }}> {estateObject.bidStep} BGN</span>
          </Descriptions.Item>
          <Descriptions.Item label={t('estate_area')} labelStyle={{ fontWeight: 900 }}>
            <span style={{ fontWeight: 500 }}> {estateObject.area} m^2</span>
          </Descriptions.Item>
          <Descriptions.Item label={t('estate_location')} labelStyle={{ fontWeight: 900 }}>
            <span style={{ fontWeight: 500 }}> {estateObject.location}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={t('estate_status')}
            labelStyle={{ fontWeight: 900 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <span
              className={
                estateObject.status === 'For Sale' ? 'saleEstateBanner' : 'soldEstateBanner'
              }
            >
              {renderTranslatedEstateStatus(estateObject.status)}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label={t('estate_description')} labelStyle={{ fontWeight: 900 }}>
            {estateObject.description}
          </Descriptions.Item>
        </Descriptions>
        {authenticated && currentUser.email === estateObject.owner && (
          <>
            <Divider></Divider>
            <Row style={{ justifyContent: 'center', marginBottom: 20 }}>
              <Button
                type="primary"
                shape="round"
                onClick={updateEstateHandler}
                style={{ marginRight: 20 }}
              >
                {t('estate_edit')}
              </Button>
              <Button
                type="primary"
                shape="round"
                onClick={() => deleteEstateHandler(estateObject.id)}
                danger
              >
                {t('estate_delete')}
              </Button>
            </Row>
          </>
        )}
        {authenticated && currentUser.email !== estateObject.owner && (
          <Row justify="center">
            {estateObject.status !== 'Sold' &&
              estateObject.applicants.find((applicant) => applicant === currentUser.email) ===
                undefined && (
                <Button
                  type="primary"
                  shape="round"
                  style={{ width: '80%', marginBottom: '5%' }}
                  onClick={openEstateApplicationModalHandler}
                >
                  {t('estate_apply_to_buy')}
                </Button>
              )}
          </Row>
        )}
      </div>
      <ApplyForEstateModal />
    </>
  );
}

export default EstateCard;
