import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openRentModal, closeRentModal, setUpdatePage } from '../../store/slices/rentSlice';

import { motion } from 'framer-motion';

import { Col, Row } from 'antd';
import { Button, Spin } from 'antd';

import RentCard from './RentCard';
import AddEditRentModal from './modals/AddEditRentModal';

import { getRents } from '../../services/rents-service';
import { ReduxState } from '../../store';
import Rent from '../../models/rents/Rent';

import { useTranslation } from 'react-i18next';

function Rents() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const updatePageTrigger = useSelector((state: ReduxState) => state.rent.triggeredUpdate);
  const authenticated = useSelector((state: ReduxState) => state.auth.isAuthenticated);

  const [loading, setLoading] = useState(false);
  const [rents, setRents] = useState<Rent[]>();

  const fetchData = async () => {
    setLoading(true);
    const data = await getRents();
    setRents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [updatePageTrigger]);

  const openRentModalHandler = () => {
    dispatch(openRentModal());
  };

  return (
    <>
      <Row justify="center">
        <h1>{t('rents_menu_label')}</h1>
      </Row>
      {loading ? (
        <Row justify="center">
          <Spin size="large" spinning={loading} />
        </Row>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {authenticated && (
            <Row justify="center" style={{ marginBottom: '10px' }}>
              <Button type="primary" onClick={openRentModalHandler}>
                {t('rent_add_button')}
              </Button>
            </Row>
          )}
          <Row justify="center">
            <Col>
              {rents &&
                rents.map((rent, index) => <RentCard key={index} rentObject={rent}></RentCard>)}
            </Col>
          </Row>
        </motion.div>
      )}
      <AddEditRentModal />
    </>
  );
}

export default Rents;
