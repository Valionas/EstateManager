import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { openRentModal, closeRentModal, setUpdatePage } from '../../store/slices/rentSlice';

import { motion } from 'framer-motion';

import { Col, Row } from 'antd';
import { Space, Table, Tag, Modal, Button, Spin, Image, Divider } from 'antd';
import { showConfirmationModal } from '../../components/ConfirmationModal';

import { getRequestsByOwner, deleteRequest } from '../../services/rent-requests-service';
import {
  updateMessage,
  getMessagesBySender,
  getMessageByRequestId,
} from '../../services/messages-service';
import { addReport } from '../../services/reports-service';
import { getRentById, updateRent } from '../../services/rents-service';
import React from 'react';
import { ReduxState } from '../../store';
import { useTranslation } from 'react-i18next';

function RentRequests() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const updatePageTrigger = useSelector((state: ReduxState) => state.rent.triggeredUpdate);
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);

  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState();

  const fetchData = async () => {
    setLoading(true);
    const data = await getRequestsByOwner(currentUser.email);
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [updatePageTrigger]);

  const approveRequestHandler = (sender, id, request) => {
    showConfirmationModal(t('approve_message'), async function (answer) {
      if (answer) {
        let rent = await getRentById(request.rentId);
        if (rent) {
          rent.applicants = [];
          rent.status = 'Occupied';
          await updateRent(rent, rent.id);

          let generatedReport = {
            image: request.image,
            name: request.rentName,
            renter: request.renter,
            location: request.location,
            rent: Number(request.rent),
            owner: currentUser.email,
            months: request.months,
            type: 'rent',
          };
          let message = await getMessageByRequestId(sender, id);
          message.status = 'Approved';
          await addReport(generatedReport);
          await updateMessage(message, message.id);
          await deleteRequest(id);
          dispatch(setUpdatePage());
        }
      }
    });
  };

  const declineRequestHandler = (sender, id, request) => {
    showConfirmationModal(t('decline_message'), async function (answer) {
      if (answer) {
        let rent = await getRentById(request.rentId);
        if (rent) {
          let rentApplicants = rent.applicants.filter((x) => x !== sender);
          rent.applicants = rentApplicants;
          await updateRent(rent, rent.id);

          let message = await getMessageByRequestId(sender, id);
          message.status = 'Declined';
          await updateMessage(message, message.id);
          await deleteRequest(id);
          dispatch(setUpdatePage());
        }
      }
    });
  };

  const requestColumns = [
    {
      title: t('table_image'),
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <div style={{ maxWidth: '200px', maxHeight: '160px' }}>
          <Image width={'100%'} src={image} />
        </div>
      ),
    },
    {
      title: t('table_name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('table_location'),
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: t('table_rent'),
      dataIndex: 'rent',
      key: 'rent',
    },
    {
      title: t('rent_minimal_rent_time'),
      dataIndex: 'months',
      key: 'months',
    },
    {
      title: t('table_renter'),
      dataIndex: 'renter',
      key: 'renter',
    },
    {
      title: t('table_date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('table_message'),
      dataIndex: 'message',
      key: 'message',
      render: (message) => (
        <div style={{ maxWidth: '200px', maxHeight: '200px', overflowY: 'auto' }}>{message}</div>
      ),
    },
    {
      title: t('table_actions'),
      dataIndex: 'actions',
      key: 'actions',
      render: (item, record) => (
        <>
          <Row>
            <Col md={24} lg={{ span: 11 }} style={{ marginBottom: 5 }}>
              <Button
                style={{ width: '100%' }}
                type="primary"
                shape="round"
                onClick={(e) => approveRequestHandler(record.renter, record.id, record)}
              >
                {t('table_approve')}
              </Button>
            </Col>
            <Col md={24} lg={{ span: 11, offset: 1 }}>
              <Button
                style={{ width: '100%' }}
                type="primary"
                shape="round"
                onClick={(e) => declineRequestHandler(record.renter, record.id, record)}
                danger
              >
                {t('table_decline')}
              </Button>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  return (
    <>
      <Row justify="center">
        <h1>{t('my_rent_requests_menu_label')}</h1>
      </Row>
      {loading ? (
        <Row justify="center">
          <Spin size="large" spinning={loading} />
        </Row>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: +200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75 }}
        >
          <Row justify="center">
            <Col span={24}>
              {requests && (
                <Table
                  scroll={{ x: true }}
                  columns={requestColumns}
                  dataSource={requests}
                  locale={{ emptyText: t('table_no_data') }}
                  style={{ verticalAlign: 'inherit', marginBottom: 15 }}
                />
              )}
            </Col>
          </Row>
        </motion.div>
      )}
    </>
  );
}

export default RentRequests;
