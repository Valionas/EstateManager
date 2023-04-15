import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentRentRequest,
  openRentModal,
  closeRentModal,
  setUpdatePage,
  openRequestRentModal,
} from '../../store/slices/rentSlice';
import {
  setCurrentEstateApplication,
  openApplyForEstateModal,
} from '../../store/slices/estateSlice';

import { motion } from 'framer-motion';

import { Col, Row } from 'antd';
import { Table, Button, Spin, Image, Divider } from 'antd';
import { showConfirmationModal } from '../../components/ConfirmationModal';
import { modalMessage } from '../../globals/messages';

import { getMessagesBySender, deleteMessage } from '../../services/messages-service';
import { getEstateById, updateEstate } from '../../services/estates-service';
import { getRentById, updateRent } from '../../services/rents-service';
import {
  getEstateApplicationById,
  deleteEstateApplication,
} from '../../services/estate-applications-service';
import { getRentRequestById, deleteRequest } from '../../services/rent-requests-service';

import RequestRentModal from '../rents/modals/RequestRentModal';
import ApplyForEstateModal from '../estates-for-sale/modals/ApplyForEstateModal';
import React from 'react';
import { ReduxState } from '../../store';

function SentMessages() {
  const dispatch = useDispatch();
  const updatePageTrigger = useSelector((state: ReduxState) => state.rent.triggeredUpdate);
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState();

  const fetchData = async () => {
    setLoading(true);
    const data = await getMessagesBySender(currentUser.email);
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [updatePageTrigger]);

  const deleteMessageHandler = (id, record) => {
    showConfirmationModal(modalMessage, async function (answer) {
      if (answer) {
        switch (record.type) {
          case 'estate':
            let currentEstate = await getEstateById(record.relatedObjectId);
            if (currentEstate) {
              currentEstate.applicants = currentEstate.applicants.filter(
                (x) => x !== record.sender
              );
              await updateEstate(currentEstate, currentEstate.id);

              let estateApplication = await getEstateApplicationById(record.relatedOfferId);
              if (estateApplication) {
                await deleteEstateApplication(record.relatedOfferId);
              }
            }

            break;
          case 'rent':
            let currentRent = await getRentById(record.relatedObjectId);
            if (currentRent) {
              currentRent.applicants = currentRent.applicants.filter((x) => x !== record.sender);
              await updateRent(currentRent, currentRent.id);

              let rentRequest = await getRentRequestById(record.relatedOfferId);
              if (rentRequest) {
                await deleteRequest(record.relatedOfferId);
              }
            }

            break;
          default:
            break;
        }
        await deleteMessage(id);
        dispatch(setUpdatePage());
      }
    });
  };

  const updateMessageHandler = (record) => {
    switch (record.type) {
      case 'estate':
        dispatch(setCurrentEstateApplication(record));
        dispatch(openApplyForEstateModal());
        break;
      case 'rent':
        dispatch(setCurrentRentRequest(record));
        dispatch(openRequestRentModal());
        break;
      default:
        break;
    }
  };

  const messagesColumns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image height={'5vh'} width={'100%'} src={image} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Receiver',
      dataIndex: 'receiver',
      key: 'receiver',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (item, record) => (
        <>
          <Row>
            {record.status === 'Pending' ? (
              <>
                <Col md={24} lg={{ span: 11 }} style={{ marginBottom: 5 }}>
                  <Button
                    style={{ width: '100%' }}
                    type="primary"
                    shape="round"
                    onClick={(e) => updateMessageHandler(record)}
                  >
                    Update
                  </Button>
                </Col>
                <Col md={24} lg={{ span: 11, offset: 1 }}>
                  <Button
                    style={{ width: '100%' }}
                    type="primary"
                    shape="round"
                    onClick={(e) => deleteMessageHandler(record.id, record)}
                    danger
                  >
                    Delete
                  </Button>
                </Col>
              </>
            ) : (
              <>
                <Col md={24} lg={{ span: 20 }} style={{ marginBottom: 5 }}>
                  <Button
                    style={{ width: '100%' }}
                    type="primary"
                    shape="round"
                    onClick={(e) => deleteMessageHandler(record.id, record)}
                    danger
                  >
                    Delete
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </>
      ),
    },
  ];

  return (
    <>
      <Row justify="center">
        <h1>Sent Messages</h1>
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
              {messages && (
                <Table scroll={{ x: true }} columns={messagesColumns} dataSource={messages} />
              )}
            </Col>
          </Row>
        </motion.div>
      )}
      <RequestRentModal />
      <ApplyForEstateModal />
    </>
  );
}

export default SentMessages;
