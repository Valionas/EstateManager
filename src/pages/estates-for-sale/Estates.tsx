import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openEstateModal, closeEstateModal, setUpdatePage } from '../../store/slices/estateSlice';

import { motion } from 'framer-motion';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button, Spin } from 'antd';

import EstateCard from './EstateCard';
import AddEditEstateModal from './modals/AddEditEstateModal';
import { getEstates } from '../../services/estates-service';
import React from 'react';
import { ReduxState } from '../../store';
import Estate from '../../models/estates/Estate';

function Estates() {
  const dispatch = useDispatch();
  const updatePageTrigger = useSelector((state: ReduxState) => state.estate.triggeredUpdate);
  const authenticated = useSelector((state: ReduxState) => state.auth.isAuthenticated);

  const [loading, setLoading] = useState(false);
  const [estates, setEstates] = useState<Estate[]>();

  const fetchData = async () => {
    setLoading(true);
    const data = await getEstates();
    setEstates(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [updatePageTrigger]);

  const openEstateModalHandler = () => {
    dispatch(openEstateModal());
  };

  return (
    <>
      <Row justify="center">
        <h1>Estates</h1>
      </Row>
      {loading ? (
        <Row justify="center">
          <Spin size="large" spinning={loading} />
        </Row>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {authenticated && (
            <Row justify="center" style={{ marginBottom: '10px' }}>
              <Button type="primary" onClick={openEstateModalHandler}>
                Publish for sale
              </Button>
            </Row>
          )}
          <Row justify="center">
            {estates &&
              estates.map((estate, index) => (
                <Col span={12}>
                  <EstateCard key={index} estateObject={estate}></EstateCard>
                </Col>
              ))}
          </Row>
        </motion.div>
      )}
      <AddEditEstateModal />
    </>
  );
}

export default Estates;
